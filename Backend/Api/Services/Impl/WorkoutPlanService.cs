using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Responses.WorkoutPlanResponses;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Impl
{
    public class WorkoutPlanService : IWorkoutPlanService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public WorkoutPlanService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<WorkoutPlanResponseDto> CreateWorkoutPlanAsync(string userId, WorkoutPlanCreateDto workoutPlanCreateDto)
        {
            var workoutPlanEntity = _mapper.Map<WorkoutPlan>(workoutPlanCreateDto);
            workoutPlanEntity.UserId = userId;
            workoutPlanEntity.CreatedAt = DateTime.UtcNow;

            foreach (var workoutPlanDayDto in workoutPlanCreateDto.WorkoutDays)
            {

                foreach (var dayExerciseDto in workoutPlanDayDto.DayExercises)
                {
                    var exists = await _context.Exercises.AnyAsync(e => e.Id == dayExerciseDto.ExerciseId);
                    if (!exists)
                    {
                        throw new BadRequestException("Exercise does not exist");
                    }
                }
            }

            _context.WorkoutPlans.Add(workoutPlanEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutPlanResponseDto>(workoutPlanEntity);
        }

        public async Task<IEnumerable<WorkoutPlanResponseDto>> GetUserWorkoutPlansAsync(string userId)
        {
            var workoutPlanEntities = await _context.WorkoutPlans
                .Where(wp => wp.UserId == userId)
                .Include(wp => wp.WorkoutPlanDays)
                    .ThenInclude(wpd => wpd.DayExercises)
                        .ThenInclude(de => de.Exercise)
                .ToListAsync();

            return _mapper.Map<List<WorkoutPlanResponseDto>>(workoutPlanEntities);
        }
    }
}
