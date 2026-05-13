using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);

            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            _context.Activities.Remove(activity);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem deleting the activity", 400);
        }
    }
}
