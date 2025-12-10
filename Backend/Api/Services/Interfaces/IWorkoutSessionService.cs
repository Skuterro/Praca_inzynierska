using Api.Models.Requests.QueryParams;
using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.ActiveSessionResponses;
using Api.Models.Responses.PagedResult;
using Api.Models.Responses.WorkoutSessionResponses;

namespace Api.Services.Interfaces
{
    public interface IWorkoutSessionService
    {
        Task<StartWorkoutSessionResponse> StartWorkoutSessionAsync(string userId, StartWorkoutSessionRequest request);
        Task<WorkoutSessionSetResponse> AddSetAsync(string userId, AddWorkouSessionSetRequest request);
        Task FinishWorkoutSessionAsync(string userId, FinishWorkoutSessionRequest request);
        Task<SessionStatusResponse> GetTodaySessionStatusAsync(string userId);
        Task<PagedResult<WorkoutSessionResponse>> GetAllUserWorkoutSessionsAsync(string userId, QueryParams queryParams);
        Task<WorkoutSessionDetailsResponse> GetWorkoutSessionDetailsByIdAsync(string userId, int sessionId);
    }
}
