using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class BodyMeasurements
    {
        [Key]
        public int Id { get; set; }

        public decimal WeightKg { get; set; }
        public decimal HeightCm { get; set; }
        public int BodyFatPercent { get; set; }

        public string UserId { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
