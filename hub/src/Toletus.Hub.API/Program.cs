using Scalar.AspNetCore;
using Toletus.Hub;
using Toletus.Hub.Services;
using Toletus.Hub.Services.NotificationsServices;
using Toletus.Hub.DeviceCollectionManager;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Lê config
var hubCfg = builder.Configuration.GetSection("Hub");
var bindIpForDevices = hubCfg.GetValue<string>("BindIp"); // usar só para devices
var port = hubCfg.GetValue<int?>("Port") ?? 5110;

// Kestrel: escuta em todas as interfaces
builder.WebHost.ConfigureKestrel(o =>
{
    o.Listen(IPAddress.Any, port);        // http://0.0.0.0:5110
    // Se precisar HTTPS, adicionar outro Listen com certificado
});

ConfigureServices(builder, bindIpForDevices);

var app = builder.Build();
ConfigureMiddlewares(app);

app.Run();

void ConfigureServices(WebApplicationBuilder builder, string? bindIpForDevices)
{
    InitializeNotificationServices();

    // Usa o IP da interface para varrer os devices (NÃO é o IP de bind do servidor)
    if (!string.IsNullOrWhiteSpace(bindIpForDevices))
    {
        var boards = LiteNet2Devices.SearchLiteNet2Boards(IPAddress.Parse(bindIpForDevices));
        LiteNet2Devices.SetBoards([.. boards]);
    }

    builder.RegisterIoC();
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddOpenApi();
}

void ConfigureMiddlewares(WebApplication app)
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.Lifetime.ApplicationStopping.Register(ApplicationStopping);
    app.MapControllers();
}

void ApplicationStopping() => Console.WriteLine("The application is shutting down...");

void InitializeNotificationServices()
{
    LiteNet1NotificationService.Initialize();
    LiteNet2NotificationService.Initialize();
    LiteNet3NotificationService.Initialize();
}
