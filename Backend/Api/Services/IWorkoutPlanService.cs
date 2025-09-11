using Api.Models.Entities;
using Api.Models.Requests.WorkoutPlanRequests;

namespace Api.Services
{
    public interface IWorkoutPlanService
    {
        Task<WorkoutPlan> CreateWorkoutPlanAsync(string userId, WorkoutPlanCreateDto workoutPlanCreateDto);
    }
}
