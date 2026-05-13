using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(new object[] { request.ActivityDto.Id }, cancellationToken);

            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            _mapper.Map(request.ActivityDto, activity);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating the activity", 400);
        }
    }
}
