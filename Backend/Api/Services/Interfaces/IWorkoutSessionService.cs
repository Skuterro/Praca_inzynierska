using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.WorkoutSessionResponses;

namespace Api.Services.Interfaces
{
    public interface IWorkoutSessionService
    {
        Task<WorkoutSessionResponseDto> CreateWorkoutSessionAsync(string userId, WorkoutSessionCreateDto workoutSessionCreateDto);
        Task<WorkoutSessionSetResponseDto> CreateWorkoutSessionSetAsync(WorkoutSessionSetCreateDto workoutSessionSetCtCreateDto);
        Task<IEnumerable<WorkoutSessionResponseDto>> GetAllUserWorkoutSessionsAsync(string userId);
        Task<WorkoutSessionResponseDto> GetWorkoutSessionByIdAsync(int id);
        Task<WorkoutSessionSetResponseDto> GetWorkoutSessionSetByIdAsync(int id);

    }
}
