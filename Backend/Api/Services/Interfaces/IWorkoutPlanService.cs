using Api.Models.Entities;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Responses.WorkoutPlanResponses;

namespace Api.Services.Interfaces
{
    public interface IWorkoutPlanService
    {
        Task<WorkoutPlanResponseDto> CreateEmptyWorkoutPlanAsync(string userId, WorkoutPlanCreateDto workoutPlanCreateDto);
        Task<WorkoutPlanDayResponseDto> AddDayToPlanAsync(string userId, WorkoutPlanDayCreateDto dto);
        Task<DayExerciseResponseDto> AddExerciseToDayAsync(string userId, DayExerciseCreateDto dto);
        Task ToggleWorkoutPlanAsync(string userId, int planId);
        Task<IEnumerable<WorkoutPlanDayResponseDto>> GetWorkoutPlanDaysAsync(string userId, int planId);
        Task<IEnumerable<WorkoutPlanResponseDto>> GetUserWorkoutPlansAsync(string userId);
        Task<IEnumerable<DayExerciseResponseDto>> GetWorkoutPlanDayExercisesAsync(string userId, int dayId);
        Task<WorkoutPlanResponseDto> GetWorkoutPlanById(int id);
    }
}
