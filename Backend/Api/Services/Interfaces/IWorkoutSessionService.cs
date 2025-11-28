using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.ActiveSessionResponses;
using Api.Models.Responses.WorkoutSessionResponses;

namespace Api.Services.Interfaces
{
    public interface IWorkoutSessionService
    {
        Task<StartWorkoutSessionResponse> StartWorkoutSessionAsync(string userId, StartWorkoutSessionRequest request);
        Task<WorkoutSessionSetResponse> AddSetAsync(string userId, AddWorkouSessionSetRequest request);
        Task FinishWorkoutSessionAsync(string userId, FinishWorkoutSessionRequest request);
        Task<SessionStatusResponse> GetTodaySessionStatusAsync(string userId);
        Task<IEnumerable<WorkoutSessionResponse>> GetAllUserWorkoutSessionsAsync(string userId);
        Task<WorkoutSessionResponse> GetWorkoutSessionByIdAsync(int sessionId);
        Task<WorkoutSessionDetailsResponse> GetWorkoutSessionDetailsByIdAsync(string userId, int sessionId);
        Task<WorkoutSessionSetResponse> GetWorkoutSessionSetByIdAsync(int id);

    }
}
