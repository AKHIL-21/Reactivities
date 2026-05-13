using API.Middleware;
using Application.Core;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddDbContext<AppDbContext>(
    opt => opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnecton"))
);
builder.Services.AddCors();
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<Application.Activities.Queries.GetActivityList.Handler>();
     x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});
builder.Services.AddAutoMapper(x => x.AddProfile(new Application.Core.MappingProfiles()));
builder.Services.AddValidatorsFromAssemblyContaining<Application.Activities.Validators.CreateActivityValidator>();
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
using var scope =app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await Dbinitializer.SeedData(context);
}
catch (Exception ex)
{
var logger = services.GetRequiredService<ILogger<Program>>();
logger.LogError(ex,"An error occured during Migration.");
    
}
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000","https://localhost:3000"));

app.MapControllers();

app.Run();
