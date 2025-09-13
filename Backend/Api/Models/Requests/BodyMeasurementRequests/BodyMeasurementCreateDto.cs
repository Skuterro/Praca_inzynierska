using Api.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.BodyMeasurementRequests
{
    public class BodyMeasurementCreateDto
    {
        [Required(ErrorMessage = "Weight is required")]
        public int WeightKg { get; set; }

        [Required(ErrorMessage = "Height is required")]
        public int HeightCm { get; set; }

        [Required(ErrorMessage = "BF % is required")]
        [Range(0, 100, ErrorMessage = "BF % must be between 0–100.")]
        public int BodyFatPercent { get; set; } = 0;
    }
}
