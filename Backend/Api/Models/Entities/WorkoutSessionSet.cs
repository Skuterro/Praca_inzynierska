using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class WorkoutSessionSet
    {
        [Key]
        public int Id { get; set; }

        public int WorkoutSessionExerciseId { get; set; }
        public WorkoutSessionExercise WorkoutSessionExercise { get; set; } = null!;

        [Required]
        public int SetNumber { get; set; }

        [Required]
        public int Reps { get; set; }

        [Required]
        public decimal WeightKg { get; set; }

    }
}
