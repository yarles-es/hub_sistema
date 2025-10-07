using Scalar.AspNetCore;
using Toletus.Hub;
using Toletus.Hub.Services;
using Toletus.Hub.Services.NotificationsServices;
using Toletus.Hub.DeviceCollectionManager;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Lê config
var hubCfg = builder.Configuration.GetSection("Hub");
var bindIpForDevices = hubCfg.GetValue<string>("BindIp");
var port = hubCfg.GetValue<int?>("Port") ?? 5110;

builder.WebHost.ConfigureKestrel(o =>
{
    o.Listen(IPAddress.Any, port);
});

ConfigureServices(builder, bindIpForDevices);

var app = builder.Build();
ConfigureMiddlewares(app);

app.Run();

void ConfigureServices(WebApplicationBuilder builder, string? bindIpForDevices)
{
    InitializeNotificationServices();

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
