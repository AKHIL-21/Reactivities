using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator Mediator => _mediator ??=
        HttpContext.RequestServices.GetService<IMediator>() ?? throw new Exception("Mediator service not found");

    protected ActionResult<T> HandleResult<T>(Result<T> result)
    {
        if (!result.IsSuccess)
        {
            return result.Code == StatusCodes.Status404NotFound
                ? NotFound(result.Error)
                : BadRequest(result.Error);
        }

        return result.Value!;
    }

    protected ActionResult HandleResult(Result<Unit> result)
    {
        if (!result.IsSuccess)
        {
            return result.Code == StatusCodes.Status404NotFound
                ? NotFound(result.Error)
                : BadRequest(result.Error);
        }

        return NoContent();
    }
}
