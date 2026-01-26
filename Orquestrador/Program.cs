using System;
using System.Diagnostics;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Linq;
using System.Collections.Generic;
using System.IO;

class ManagedProc
{
    public string Name { get; }
    public string FileName { get; }
    public string Args { get; }
    public string WorkingDir { get; }
    public Process? Proc { get; private set; }

    public ManagedProc(string name, string fileName, string args, string workingDir)
    {
        Name = name; FileName = fileName; Args = args; WorkingDir = workingDir;
    }

    public void Start()
    {
        var psi = new ProcessStartInfo
        {
            FileName = FileName,
            Arguments = Args,
            WorkingDirectory = WorkingDir,
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            CreateNoWindow = false,
        };

        Proc = new Process { StartInfo = psi, EnableRaisingEvents = true };
        Proc.OutputDataReceived += (_, e) => { if (e.Data != null) WriteLog(Name, e.Data); };
        Proc.ErrorDataReceived  += (_, e) => { if (e.Data != null) WriteLog(Name, e.Data); };
        Proc.Exited += (_, __) => WriteLog(Name, $"[exit code {Proc!.ExitCode}]");

        if (!Proc.Start()) throw new Exception($"Falha ao iniciar {Name}");
        Proc.BeginOutputReadLine();
        Proc.BeginErrorReadLine();
        WriteLog(Name, "[iniciado]");
    }

    public void KillTree()
    {
        var p = Proc;
        if (p == null) return;
        try
        {
            // Se o processo não chegou a iniciar, acessar HasExited pode lançar.
            // Try/catch cobre tanto esse caso quanto processos já mortos.
            if (!p.HasExited) p.Kill(entireProcessTree: true);
        }
        catch { /* ignora */ }
    }

    static readonly object _lock = new();
    public static void WriteLog(string name, string line)
    {
        lock (_lock)
        {
            Console.WriteLine($"[{DateTime.Now:HH:mm:ss}][{name}] {line}");
        }
    }
}

class Program
{
    static List<ManagedProc> procs = new();

    static int Main(string[] args)
    {
        // ====== CAMINHOS DO SEU PROJETO (ajuste se necessário) ======
        var apiPath      = @"C:\\erp_academia\\hub\\src\\Toletus.Hub.API";
        var backendPath  = @"C:\\erp_academia\\back-end";
        var frontendPath = @"C:\\erp_academia\\front-end";

        // ====== PORTAS/ALVOS (usados no wait) ======
        const string apiHost = "127.0.0.1"; // use 127.0.0.1 para evitar ::1
        const int apiPort    = 5110;
        const int backPort   = 3000;        // se quiser esperar o backend

        // ====== COMANDOS ======
        var api = new ManagedProc(
            name: "API.NET",
            fileName: "dotnet",
            args: "run",
            workingDir: apiPath
        );

        var backend = new ManagedProc(
            name: "BackendNode",
            fileName: "node",
            args: "./build/index.js",
            workingDir: backendPath
        );

        // Frontend: build condicional (se não houver .next/BUILD_ID)
        var frontend = new ManagedProc(
            name: "Frontend",
            fileName: "cmd.exe",
            args: "/c IF EXIST .next\\BUILD_ID (npm start) ELSE (npm run build && npm start)",
            workingDir: frontendPath
        );

        procs = new List<ManagedProc> { api, backend, frontend };

        // Encerrar tudo ao fechar janela / Ctrl+C
        AppDomain.CurrentDomain.ProcessExit += (_, __) => StopAll();
        Console.CancelKeyPress += (_, e) => { e.Cancel = true; StopAll(); Environment.Exit(0); };

        try
        {
            Console.OutputEncoding = Encoding.UTF8;
            Log("== Orquestrador iniciado ==");
            Log("Feche a janela ou tecle Ctrl+C para encerrar tudo.");

            // ---- Valida diretórios ----
            RequireDir(apiPath,      "API.NET");
            RequireDir(backendPath,  "BackendNode");
            RequireDir(frontendPath, "Frontend");

            // ---- Inicia API e espera porta 5110 ----
            api.Start();
            Log($"Aguardando API em {apiHost}:{apiPort}...");
            WaitForPort(apiHost, apiPort, TimeSpan.FromSeconds(60), TimeSpan.FromSeconds(1));
            Log("API disponível.");

            // ---- Inicia Backend e (opcional) espera porta 3000 ----
            backend.Start();
            Log($"Aguardando Backend em 127.0.0.1:{backPort}...");
            WaitForPort("127.0.0.1", backPort, TimeSpan.FromSeconds(60), TimeSpan.FromSeconds(1));
            Log("Backend disponível.");

            // ---- Inicia Frontend ----
            frontend.Start();

            // Mantém vivo enquanto houver algum processo em execução
            while (procs.Any(p => p.Proc is { HasExited: false }))
            {
                Thread.Sleep(500);
            }

            Log("== Todos os processos finalizaram ==");
            return 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ERRO] {ex.Message}");
            StopAll();
            return 1;
        }
    }

    static void StopAll()
    {
        foreach (var p in procs)
        {
            try { p.KillTree(); } catch { }
        }
        Log("== Encerrando processos... ==");
        Thread.Sleep(300);
    }

    static void WaitForPort(string host, int port, TimeSpan timeout, TimeSpan interval)
    {
        var sw = Stopwatch.StartNew();
        Exception? last = null;
        while (sw.Elapsed < timeout)
        {
            try
            {
                using var tcp = new TcpClient();
                var task = tcp.ConnectAsync(host, port);
                if (task.Wait(interval) && tcp.Connected) return; // ok
            }
            catch (Exception ex) { last = ex; }
            Thread.Sleep(interval);
        }
        throw new TimeoutException($"Porta não respondeu: {host}:{port}. Último erro: {last?.Message}");
    }

    static void RequireDir(string path, string label)
    {
        if (!Directory.Exists(path))
            throw new DirectoryNotFoundException($"Diretório de {label} não encontrado: {path}");
    }

    static void Log(string line) => Console.WriteLine($"[{DateTime.Now:HH:mm:ss}][LAUNCHER] {line}");
}
