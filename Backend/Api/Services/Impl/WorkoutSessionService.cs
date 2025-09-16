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

        public async Task<WorkoutSessionResponseDto> CreateWorkoutSessionAsync(string userId, WorkoutSessionCreateDto workoutSessionCreateDto)
        {
            var workoutSessionEntity = _mapper.Map<WorkoutSession>(workoutSessionCreateDto);
            workoutSessionEntity.UserId = userId;
            workoutSessionEntity.SessionDate = DateTime.UtcNow;

            _context.WorkoutSessions.Add(workoutSessionEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutSessionResponseDto>(workoutSessionEntity);
        }

        public async Task<WorkoutSessionSetResponseDto> CreateWorkoutSessionSetAsync(WorkoutSessionSetCreateDto workoutSessionSetCreateDto)
        {
            var workoutSession = await _context.WorkoutSessions
                .Include(ws => ws.WorkoutPlanDay)    
                    .ThenInclude(wpd => wpd.DayExercises)
                .FirstOrDefaultAsync(ws => ws.Id == workoutSessionSetCreateDto.WorkoutSessionId);

            if (workoutSession == null)
            {
               throw new BadRequestException("Workout session does not exist");
            }
            
            bool exerciseExists = workoutSession.WorkoutPlanDay.DayExercises.Any(de => de.ExerciseId == workoutSessionSetCreateDto.ExerciseId);
            if (!exerciseExists)
            {
                throw new BadRequestException("Exercise is not in Today's plan");
            }

            var workoutSessionSetEntity = _mapper.Map<WorkoutSessionSet>(workoutSessionSetCreateDto);

            _context.WorkoutSessionSets.Add(workoutSessionSetEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutSessionSetResponseDto>(workoutSessionSetEntity);
        }

        public async Task<IEnumerable<WorkoutSessionResponseDto>> GetAllUserWorkoutSessionsAsync(string userId)
        {
            var workoutSessionEntities = await _context.WorkoutSessions
                .Where(ws => ws.UserId == userId)
                .Include(ws => ws.WorkoutPlanDay)
                .Include(ws => ws.SessionSets)
                    .ThenInclude(ss => ss.Exercise)
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
