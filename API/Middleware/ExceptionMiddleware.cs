using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleException(context, ex, _env);
        }
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var errors = ex.Errors
            .GroupBy(error => error.PropertyName)
            .ToDictionary(
                group => group.Key,
                group => group.Select(error => error.ErrorMessage).ToArray());

        var problemDetails = new ValidationProblemDetails(errors)
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "Validation error"
        };

        await context.Response.WriteAsJsonAsync(problemDetails);
    }

    private static async Task HandleException(HttpContext context, Exception ex, IHostEnvironment env)
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = ex.Message,
            Detail = env.IsDevelopment() ? ex.StackTrace : "Internal Server Error"
        };

        await context.Response.WriteAsJsonAsync(problemDetails);
    }
}
