using Api.Models.Entities;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Responses.WorkoutPlanResponses;

namespace Api.Services.Interfaces
{
    public interface IWorkoutPlanService
    {
        Task<WorkoutPlanResponse> CreateEmptyWorkoutPlanAsync(string userId, CreateWorkoutPlanRequest request);
        Task<SimpleWorkoutPlanDayResponse> AddDayToPlanAsync(string userId, CreateWorkoutPlanDayRequest request);
        Task<DayExerciseResponse> AddExerciseToDayAsync(string userId, CreateDayExerciseRequest request);
        Task ToggleWorkoutPlanAsync(string userId, int planId);
        Task<WorkoutPlanDayResponse> GetWorkoutPlanByWeekDayAsync(string userId, int weekDayIndex);
        Task<IEnumerable<SimpleWorkoutPlanDayResponse>> GetWorkoutPlanDaysAsync(string userId, int planId);
        Task<IEnumerable<WorkoutPlanResponse>> GetUserWorkoutPlansAsync(string userId);
        Task<IEnumerable<DayExerciseResponse>> GetWorkoutPlanDayExercisesAsync(string userId, int dayId);
        Task DeleteWorkoutPlanAsync(string userId, int planId);
        Task DeleteWorkoutPlanDayAsync(string userId, int planDayId);
    }
}
