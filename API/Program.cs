
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Registering our generic repository as a service
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseAuthorization();

app.MapControllers();


// Applying migrations automatically when the app starts
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<ApplicationDbContext>();
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await ApplicationDbSeeds.SeedAsync(context);
}
catch (Exception ex)
{
    logger.LogCritical(ex, "An error occored during applying migrations");
}

app.Run();
