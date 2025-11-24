using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class WorkoutSession
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public User User { get; set; } = null!;

        public int WorkoutPlanDayId {  get; set; }
        public WorkoutPlanDay WorkoutPlanDay { get; set; } = null!;

        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public bool IsFinished { get; set; } = false;

        public ICollection<WorkoutSessionExercise> SessionExercises { get; set; } = new List<WorkoutSessionExercise>();
    }
}
