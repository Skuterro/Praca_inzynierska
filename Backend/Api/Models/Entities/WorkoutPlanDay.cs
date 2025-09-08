using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class WorkoutPlanDay
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(9)]
        public string WeekDay { get; set; } = null!;

        public int WorkoutPlanId { get; set; }
        public WorkoutPlan WorkoutPlan { get; set; } = null!;

        public ICollection<DayExercise> DayExercises { get; set; } = new List<DayExercise>();

        public ICollection<WorkoutSession> WorkoutSessions { get; set; } = new List<WorkoutSession>();
    }
}
