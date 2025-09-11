using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class DayExercise
    {
        [Key]
        public int Id { get; set; }

        public int WorkoutPlanDayId { get; set; }
        public WorkoutPlanDay WorkoutPlanDay { get; set; } = null!;

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; } = null!;

        [Required]
        public int Sets {  get; set; }

        [Required]
        public int Reps { get; set; }
    }
}
