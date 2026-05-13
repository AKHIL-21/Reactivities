using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDTo activity)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDTo = activity }));
    }

    [HttpPut]
    [HttpPut("{id}")]
    [HttpPatch]
    [HttpPatch("{id}")]
    public async Task<ActionResult> EditActivity(string? id, EditActivityDto activity)
    {
        if (!string.IsNullOrEmpty(id))
        {
            activity.Id = id;
        }

        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }
}
