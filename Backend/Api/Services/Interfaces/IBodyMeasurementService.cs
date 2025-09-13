using Api.Models.Requests.BodyMeasurementRequests;
using Api.Models.Responses.BodyMeasurementResponses;

namespace Api.Services.Interfaces
{
    public interface IBodyMeasurementService
    {
        Task<IEnumerable<BodyMeasurementResponseDto>> GetUserBodyMeasurementsAsync(string userId);
        Task<BodyMeasurementResponseDto> GetBodyMeasurementByIdAsync(int id);
        Task<BodyMeasurementResponseDto> CreateBodyMeasurementAsync(string userId, BodyMeasurementCreateDto bodyMeasurementCreateDto);
        Task DeleteBodyMeasurementAsync(int id);
    }
}
