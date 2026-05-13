using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDTo>
{
    public CreateActivityValidator() : base(x => x.ActivityDTo)
    {
        RuleFor(x => x.ActivityDTo).NotNull().WithMessage("Activity is required");
    }
}
