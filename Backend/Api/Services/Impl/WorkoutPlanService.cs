using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.WorkoutPlanRequests;

namespace Api.Services.Impl
{
    public class WorkoutPlanService : IWorkoutPlanService
    {
        private readonly AppDbContext _context;

        public WorkoutPlanService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<WorkoutPlan> CreateWorkoutPlanAsync(string userId, WorkoutPlanCreateDto workoutPlanCreateDto)
        {
            var workoutPlan = new WorkoutPlan
            {
                Name = workoutPlanCreateDto.Name,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            foreach (var workoutPlanDayDto in workoutPlanCreateDto.WorkoutDays)
            {
                var workoutPlanDay = new WorkoutPlanDay
                {
                    Name = workoutPlanDayDto.Name,
                    WeekDay = workoutPlanDayDto.WeekDay
                };

                foreach (var dayExerciseDto in workoutPlanDayDto.DayExercises)
                {
                    var exercise = await _context.Exercises.FindAsync(dayExerciseDto.ExerciseId);
                    if (exercise == null)
                    {
                        throw new BadRequestException("Exercise does not exist");
                    }

                    workoutPlanDay.DayExercises.Add(new DayExercise
                    {
                        ExerciseId = exercise.Id,
                        Sets = dayExerciseDto.Sets,
                        Reps = dayExerciseDto.Reps
                    });
                }

                workoutPlan.WorkoutPlanDays.Add(workoutPlanDay);
            }

            _context.WorkoutPlans.Add(workoutPlan);
            await _context.SaveChangesAsync();

            return workoutPlan;
        }
    }
}
