using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class WorkoutSessionSet
    {
        [Key]
        public int Id { get; set; }

        public int WorkoutSessionId { get; set; }
        public WorkoutSession WorkoutSession { get; set; } = null!;

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; } = null!;

        [Required]
        public int SetNumber { get; set; }

        [Required]
        public int Reps { get; set; }

        [Required]
        public int WeightKg { get; set; }

    }
}
