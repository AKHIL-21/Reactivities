using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public CreateActivityDTo ActivityDTo { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<string>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context ,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = _mapper.Map<Domain.Activity>(request.ActivityDTo);
            _context.Activities.Add(activity);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<string>.Success(activity.Id)
                : Result<string>.Failure("Problem creating the activity", 400);
        }
    }
}
