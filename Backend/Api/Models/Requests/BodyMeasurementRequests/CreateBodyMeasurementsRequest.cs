using Api.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.BodyMeasurementRequests
{
    public class CreateBodyMeasurementsRequest
    {
        public decimal? WeightKg { get; set; }

        public decimal? HeightCm { get; set; }

        [Range(0, 100, ErrorMessage = "BF % must be between 0–100.")]
        public int? BodyFatPercent { get; set; } = 0;
    }
}
