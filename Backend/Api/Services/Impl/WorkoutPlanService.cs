using System.Numerics;
using System.Reflection.Metadata.Ecma335;
using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Responses.WorkoutPlanResponses;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
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

        public async Task<WorkoutPlanResponse> CreateEmptyWorkoutPlanAsync(string userId, CreateWorkoutPlanRequest request)
        {
            var workoutPlanEntity = _mapper.Map<WorkoutPlan>(request);
            workoutPlanEntity.UserId = userId;
            workoutPlanEntity.CreatedAt = DateTime.UtcNow;

            _context.WorkoutPlans.Add(workoutPlanEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutPlanResponse>(workoutPlanEntity);
        }

        public async Task<SimpleWorkoutPlanDayResponse> AddDayToPlanAsync(string userId, CreateWorkoutPlanDayRequest request)
        {
            var plan = await _context.WorkoutPlans
                .Where(wp => wp.Id == request.PlanId && wp.UserId == userId)
                .FirstOrDefaultAsync();

            if (plan == null)
            {
                throw new BadRequestException("Workout plan does not exist.");
            }

            if (!Enum.TryParse(request.WeekDay, true, out WeekDayEnum weekDay))
            {
                throw new BadRequestException("Invalid week day value.");
            }

            var exists = await _context.WorkoutPlanDays
                .AnyAsync(d => d.WorkoutPlanId == request.PlanId && d.WeekDay == weekDay);
            if (exists)
            {
                throw new BadRequestException($"Day {weekDay} already exists in this plan.");
            }

            var workoutDayEntity = new WorkoutPlanDay
            {
                Name = request.Name,
                WeekDay = weekDay,
                WorkoutPlanId = request.PlanId,
            };

            _context.WorkoutPlanDays.Add(workoutDayEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<SimpleWorkoutPlanDayResponse>(workoutDayEntity);
        }

        public async Task<DayExerciseResponse> AddExerciseToDayAsync(string userId, CreateDayExerciseRequest request)
        {
            var day = await _context.WorkoutPlanDays
                .Include(wpd => wpd.WorkoutPlan)
                .Where(wpd => wpd.Id == request.DayId && wpd.WorkoutPlan.UserId == userId)
                .FirstOrDefaultAsync();

            if (day == null)
            {
                throw new BadRequestException("Workout plan day does not exist.");
            }

            var exerciseExists = await _context.Exercises.AnyAsync(e => e.Id == request.ExerciseId);
            if (!exerciseExists)
            {
                throw new BadRequestException("Exercise does not exist.");
            }

            var dayExerciseEntity = new DayExercise
            {
                WorkoutPlanDayId = request.DayId,
                ExerciseId = request.ExerciseId,
                Sets = request.Sets
            };

            _context.DayExercises.Add(dayExerciseEntity);
            await _context.SaveChangesAsync();

            await _context.Entry(dayExerciseEntity).Reference(de => de.Exercise).LoadAsync();

            return _mapper.Map<DayExerciseResponse>(dayExerciseEntity);
        }

        public async Task ToggleWorkoutPlanAsync( string userId, int planId)
        {
            var workoutPlan = await _context.WorkoutPlans
                .FirstOrDefaultAsync(wp => wp.Id == planId && wp.UserId == userId);

            if (workoutPlan == null)
            {
                throw new BadRequestException("Workout plan not found.");
            }


            workoutPlan.IsActive = !workoutPlan.IsActive;

            if (workoutPlan.IsActive)
            {
                var previous = await _context.WorkoutPlans
                    .FirstOrDefaultAsync(wp => wp.UserId == userId && wp.IsActive && wp.Id != planId);

                if (previous != null)
                    previous.IsActive = false;
            }

            await _context.SaveChangesAsync();
        }

        public async Task<WorkoutPlanDayResponse> GetWorkoutPlanByWeekDayAsync(string userId, int weekDayIndex)
        {
            var activeWorkoutPlan = await _context.WorkoutPlans
                .FirstOrDefaultAsync(wp => wp.UserId == userId && wp.IsActive);

            if (activeWorkoutPlan == null)
            {
                return new WorkoutPlanDayResponse();
            }

            var today = (WeekDayEnum)weekDayIndex;

            var todayWorkout = await _context.WorkoutPlanDays
                .Where(wpd => wpd.WorkoutPlanId == activeWorkoutPlan.Id && wpd.WeekDay == today)
                .Include(wpd => wpd.DayExercises)
                    .ThenInclude(de => de.Exercise)
                .FirstOrDefaultAsync();

            if (todayWorkout == null)
            {
                return new WorkoutPlanDayResponse();
            }

            return _mapper.Map<WorkoutPlanDayResponse>(todayWorkout);
        }

        public async Task<IEnumerable<WorkoutPlanResponse>> GetUserWorkoutPlansAsync(string userId)
        {
            var workoutPlanEntities = await _context.WorkoutPlans
                .Where(wp => wp.UserId == userId)
                .Include(wp => wp.WorkoutPlanDays)
                    .ThenInclude(wpd => wpd.DayExercises)
                        .ThenInclude(de => de.Exercise)
                .ToListAsync();

            return _mapper.Map<List<WorkoutPlanResponse>>(workoutPlanEntities);
        }

        public async Task<IEnumerable<SimpleWorkoutPlanDayResponse>> GetWorkoutPlanDaysAsync(string userId, int planId)
        {
            var workoutPlanExists = await _context.WorkoutPlans.AnyAsync(wp => wp.Id == planId && wp.UserId == userId);
            if (!workoutPlanExists)
            {
                throw new BadRequestException("Workout plan does not exist or does not belong to user.");
            }

            var workoutPlanDaysEntities = await _context.WorkoutPlanDays
                .Where(wpd => wpd.WorkoutPlanId == planId)
                .OrderBy(wpd => wpd.WeekDay)
                .ToListAsync();

            return _mapper.Map<List<SimpleWorkoutPlanDayResponse>>(workoutPlanDaysEntities);
        }

        public async Task<IEnumerable<DayExerciseResponse>> GetWorkoutPlanDayExercisesAsync(string userId, int dayId)
        {
            var workoutPlanDayExists = await _context.WorkoutPlanDays.AnyAsync(wpd => wpd.Id == dayId);
            if (!workoutPlanDayExists)
            {
                throw new BadRequestException("Workout day does not exist.");
            }

            var dayExerciseEntities = await _context.DayExercises
                .Where(de => de.WorkoutPlanDayId == dayId)
                .Include(de => de.Exercise)
                .ToListAsync();

            return _mapper.Map<List<DayExerciseResponse>>(dayExerciseEntities);
        }

        public async Task DeleteWorkoutPlanAsync(string userId, int planId)
        {
            var planToDelete = await _context.WorkoutPlans
                .FirstOrDefaultAsync(wp => wp.Id == planId && wp.UserId == userId);

            if (planToDelete == null)
            {
                throw new BadRequestException("Workout plan does not exist");
            }

            _context.WorkoutPlans.Remove(planToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteWorkoutPlanDayAsync(string userId, int planDayId)
        {
            var planDayToDelete = await _context.WorkoutPlanDays
                .Include(wpd => wpd.WorkoutPlan)
                .FirstOrDefaultAsync(wpd => wpd.Id == planDayId && wpd.WorkoutPlan.UserId == userId);

            if (planDayToDelete == null)
            {
                throw new BadRequestException("Workout plan day does not exist");
            }

            _context.WorkoutPlanDays.Remove(planDayToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
