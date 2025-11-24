using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class WorkoutSessionExercise
    {
        [Key]
        public int Id { get; set; }

        public int WorkoutSessionId { get; set; }
        public WorkoutSession WorkoutSession { get; set; } = null!;

        public int DayExerciseId { get; set; }
        public DayExercise DayExercise { get; set; } = null!;

        public ICollection<WorkoutSessionSet> Sets { get; set; } = new List<WorkoutSessionSet>();
    }
}
