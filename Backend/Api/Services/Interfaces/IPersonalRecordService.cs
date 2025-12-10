using Api.Models.Entities;
using Api.Models.Requests.OneRepMaxRequests;
using Api.Models.Requests.QueryParams;
using Api.Models.Responses.OneRepMaxResponses;
using Api.Models.Responses.PagedResult;

namespace Api.Services.Interfaces
{
    public interface IPersonalRecordService
    {
        Task<PersonalRecordResponse> CreatePersonalRecordAsync(string userId, PersonalRecordRequest request);
        Task<IEnumerable<PersonalRecordResponse>> GetCurrentUserRecordsAsync(string userId);
        Task<PagedResult<PersonalRecordResponse>> GetAllRecordsOfExerciseAsync(string userId, int exerciseEnum, QueryParams queryParams);
        Task DeletePersonalRecordAsync(string userId, int id);
    }
}
