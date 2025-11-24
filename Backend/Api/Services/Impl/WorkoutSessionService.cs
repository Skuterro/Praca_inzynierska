using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.WorkoutSessionResponses;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Impl
{
    public class WorkoutSessionService : IWorkoutSessionService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public WorkoutSessionService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<StartWorkoutSessionResponse> StartWorkoutSessionAsync(string userId, StartWorkoutSessionRequest request)
        {
            var workoutPlanDayExists = await _context.WorkoutPlanDays
                .FirstOrDefaultAsync(wpd => wpd.Id == request.WorkoutPlanDayId);

            if (workoutPlanDayExists == null)
            {
                throw new BadRequestException("Workout day does not exist");
            }

            var workoutSessionEntity = _mapper.Map<WorkoutSession>(request);
            workoutSessionEntity.UserId = userId;
            workoutSessionEntity.Start = DateTime.UtcNow;

            _context.WorkoutSessions.Add(workoutSessionEntity);
            await _context.SaveChangesAsync();

            return new StartWorkoutSessionResponse
            {
                SessionId = workoutSessionEntity.Id
            };
        }

        public async Task<WorkoutSessionSetResponseDto> AddSetAsync(AddWorkouSessionSetRequest request)
        {
            var workoutSession = await _context.WorkoutSessions
                .Include(ws => ws.SessionExercises)
                    .ThenInclude(se => se.Sets)
                .FirstOrDefaultAsync(ws => ws.Id == request.WorkoutSessionId);

            if (workoutSession == null)
            {
               throw new BadRequestException("Workout session does not exist");
            }
            
            var workoutSessionExercise = workoutSession.SessionExercises.FirstOrDefault(se => se.DayExerciseId == request.DayExerciseId);
            if (workoutSessionExercise == null)
            {
                workoutSessionExercise = new WorkoutSessionExercise
                {
                    WorkoutSessionId = request.WorkoutSessionId,
                    DayExerciseId = request.DayExerciseId
                };

                _context.WorkoutSessionExercises.Add(workoutSessionExercise);
                await _context.SaveChangesAsync();
            }

            var workoutSessionSetEntity = _mapper.Map<WorkoutSessionSet>(request);
            workoutSessionSetEntity.WorkoutSessionExerciseId = workoutSessionExercise.Id;
      
            _context.WorkoutSessionSets.Add(workoutSessionSetEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutSessionSetResponseDto>(workoutSessionSetEntity);
        }

        public async Task FinishWorkoutSessionAsync(string userId, FinishWorkoutSessionRequest request)
        {
            var workoutSession = await _context.WorkoutSessions
                .FirstOrDefaultAsync(ws => ws.Id == request.SessionId);

            if (workoutSession == null)
            {
                throw new BadRequestException("Workout session does not exist");
            }

            if (workoutSession.UserId != userId) 
            {
                throw new BadRequestException("User is not the owner of this workout session");
            }

            workoutSession.End = DateTime.UtcNow;
            workoutSession.IsFinished = true;
            await _context.SaveChangesAsync();
        }


        public Task<IEnumerable<WorkoutSessionExerciseResponseDto>> GetWorkoutSessionDetailsByIdAsync(string userId, int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<WorkoutSessionResponseDto>> GetAllUserWorkoutSessionsAsync(string userId)
        {
            var workoutSessionEntities = await _context.WorkoutSessions
                .Where(ws => ws.UserId == userId)
                .Include(ws => ws.WorkoutPlanDay)
                .ToListAsync();

            return _mapper.Map<List<WorkoutSessionResponseDto>>(workoutSessionEntities);
        }

        public async Task<WorkoutSessionResponseDto> GetWorkoutSessionByIdAsync(int id)
        {
            var workoutSessionEntity = await _context.WorkoutSessions.FirstOrDefaultAsync(ws => ws.Id == id);
            if (workoutSessionEntity == null)
            {
                throw new NotFoundException("Workout session does not exist");
            }

            return _mapper.Map<WorkoutSessionResponseDto>(workoutSessionEntity);
        }

        public async Task<WorkoutSessionSetResponseDto> GetWorkoutSessionSetByIdAsync(int id)
        {
            var workoutSessionSetEntity = await _context.WorkoutSessionSets.FirstOrDefaultAsync(wss => wss.Id == id);
            if (workoutSessionSetEntity == null)
            {
                throw new NotFoundException("Workout session does not exist");
            }

            return _mapper.Map<WorkoutSessionSetResponseDto>(workoutSessionSetEntity);
        }
    }
}
