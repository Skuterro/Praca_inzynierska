using Api.Models.Requests.BodyMeasurementRequests;
using Api.Models.Responses.BodyMeasurementResponses;

namespace Api.Services.Interfaces
{
    public interface IBodyMeasurementsService
    {
        Task<BodyMeasurementsResponse> CreateBodyMeasurementAsync(string userId, CreateBodyMeasurementsRequest request);
        Task<BodyMeasurementsResponse> GetUserBodyMeasurementsAsync(string userId);
        Task<BodyMeasurementsResponse> UpdateBodyMeasurementsAsync(string userId, UpdateBodyMeasurementsRequest request);
        Task DeleteBodyMeasurementsAsync(string userId, int id);
    }
}
