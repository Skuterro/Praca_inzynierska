using System.Numerics;
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

        public async Task<WorkoutPlanResponseDto> CreateEmptyWorkoutPlanAsync(string userId, WorkoutPlanCreateDto workoutPlanCreateDto)
        {
            var workoutPlanEntity = _mapper.Map<WorkoutPlan>(workoutPlanCreateDto);
            workoutPlanEntity.UserId = userId;
            workoutPlanEntity.CreatedAt = DateTime.UtcNow;

            _context.WorkoutPlans.Add(workoutPlanEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutPlanResponseDto>(workoutPlanEntity);
        }

        public async Task<WorkoutPlanDayResponseDto> AddDayToPlanAsync(string userId, WorkoutPlanDayCreateDto dto)
        {
            var plan = await _context.WorkoutPlans
                .Where(wp => wp.Id == dto.PlanId && wp.UserId == userId)
                .FirstOrDefaultAsync();

            if (plan == null)
            {
                throw new BadRequestException("Workout plan does not exist.");
            }

            if (!Enum.TryParse(dto.WeekDay, true, out WeekDayEnum weekDay))
            {
                throw new BadRequestException("Invalid week day value.");
            }

            var exists = await _context.WorkoutPlanDays
                .AnyAsync(d => d.WorkoutPlanId == dto.PlanId && d.WeekDay == weekDay);
            if (exists)
            {
                throw new BadRequestException($"Day {weekDay} already exists in this plan.");
            }

            var workoutDayEntity = new WorkoutPlanDay
            {
                Name = dto.Name,
                WeekDay = weekDay,
                WorkoutPlanId = dto.PlanId,
            };

            _context.WorkoutPlanDays.Add(workoutDayEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutPlanDayResponseDto>(workoutDayEntity);
        }

        public async Task<IEnumerable<WorkoutPlanDayResponseDto>> GetWorkoutPlanDaysAsync(string userId, int planId)
        {
            var workoutPlanExists = await _context.WorkoutPlans.AnyAsync(wp => wp.Id == planId && wp.UserId == userId);
            if (!workoutPlanExists)
            {
                throw new BadRequestException("Workout plan does not exist or does not belong to provided user.");
            }

            var workoutPlanDaysEntities = await _context.WorkoutPlanDays
                .Where(wpd => wpd.WorkoutPlanId == planId)
                .OrderBy(wpd => wpd.WeekDay)
                .ToListAsync();

            return _mapper.Map<List<WorkoutPlanDayResponseDto>>(workoutPlanDaysEntities);
        }

        public async Task<DayExerciseResponseDto> AddExerciseToDayAsync(string userId, DayExerciseCreateDto dto)
        {
            var day = await _context.WorkoutPlanDays
                .Include(wpd => wpd.WorkoutPlan)
                .Where(wpd => wpd.Id == dto.DayId && wpd.WorkoutPlan.UserId == userId)
                .FirstOrDefaultAsync();

            if (day == null)
            {
                throw new BadRequestException("Workout plan day does not exist.");
            }

            var exerciseExists = await _context.Exercises.AnyAsync(e => e.Id == dto.ExerciseId);
            if (!exerciseExists)
            {
                throw new BadRequestException("Exercise does not exist.");
            }

            var dayExerciseEntity = new DayExercise
            {
                WorkoutPlanDayId = dto.DayId,
                ExerciseId = dto.ExerciseId,
                Sets = dto.Sets
            };

            _context.DayExercises.Add(dayExerciseEntity);
            await _context.SaveChangesAsync();

            await _context.Entry(dayExerciseEntity).Reference(de => de.Exercise).LoadAsync();

            return _mapper.Map<DayExerciseResponseDto>(dayExerciseEntity);
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

        public async Task<WorkoutPlanResponseDto> GetWorkoutPlanById(int id)
        {
            var workoutPlanEntity = await _context.WorkoutPlans.FirstOrDefaultAsync(wp => wp.Id == id);
            if (workoutPlanEntity == null)
            {
                throw new NotFoundException("Workout plan does not exist");
            }

            return _mapper.Map<WorkoutPlanResponseDto>(workoutPlanEntity);
        }
    }
}
