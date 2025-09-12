using Api.Models.Entities;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Responses.WorkoutPlanResponses;

namespace Api.Services.Interfaces
{
    public interface IWorkoutPlanService
    {
        Task<WorkoutPlanResponseDto> CreateWorkoutPlanAsync(string userId, WorkoutPlanCreateDto workoutPlanCreateDto);
    }
}
