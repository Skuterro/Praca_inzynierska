using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.WorkoutSessionResponses;

namespace Api.Services.Interfaces
{
    public interface IWorkoutSessionService
    {
        Task<StartWorkoutSessionResponse> StartWorkoutSessionAsync(string userId, StartWorkoutSessionRequest request);
        Task<WorkoutSessionSetResponseDto> AddSetAsync(AddWorkouSessionSetRequest request);
        Task FinishWorkoutSessionAsync(string userId, FinishWorkoutSessionRequest request);
        Task<IEnumerable<WorkoutSessionResponseDto>> GetAllUserWorkoutSessionsAsync(string userId);
        Task<WorkoutSessionResponseDto> GetWorkoutSessionByIdAsync(int id);
        Task<IEnumerable<WorkoutSessionExerciseResponseDto>> GetWorkoutSessionDetailsByIdAsync(string userId, int id);
        Task<WorkoutSessionSetResponseDto> GetWorkoutSessionSetByIdAsync(int id);

    }
}
