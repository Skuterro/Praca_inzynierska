using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class OneRepMax
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public User User { get; set; } = null!;

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; } = null!;

        [Required]
        public int weightKg { get; set; }

        public DateTime Date {  get; set; }
    }
}
