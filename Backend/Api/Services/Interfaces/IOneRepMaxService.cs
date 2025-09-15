using Api.Models.Requests.OneRepMaxRequests;
using Api.Models.Responses.OneRepMaxResponses;

namespace Api.Services.Interfaces
{
    public interface IOneRepMaxService
    {
        Task<IEnumerable<OneRepMaxResponseDto>> GetLatestOneRepMaxesAsync(string userId);
        Task<IEnumerable<OneRepMaxResponseDto>> GetAllOneRepMaxesOfExerciseAsync(string userId, int exerciseId);
        Task<OneRepMaxResponseDto> GetOneRepMaxByIdAsync(int id);
        Task<OneRepMaxResponseDto> CreateOneRepMaxAsync(string userId, OneRepMaxCreateDto oneRepMaxCreateDto);
        Task DeleteOneRepMaxAsync(string userId, int id);
    }
}
