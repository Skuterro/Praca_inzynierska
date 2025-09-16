using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class BodyMeasurement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal WeightKg { get; set; }

        [Required]
        public decimal HeightCm { get; set; }

        [Required]
        public int BodyFatPercent { get; set; }

        public string UserId { get; set; } = null!;
        public User User { get; set; } = null!;

        public DateTime MeasurementDate { get; set; }

    }
}
