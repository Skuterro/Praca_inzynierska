using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.BodyMeasurementRequests
{
    public class UpdateBodyMeasurementsRequest : CreateBodyMeasurementsRequest
    {
        [Required]
        public int BodyMeasurementsId { get; set; }
    }
}
