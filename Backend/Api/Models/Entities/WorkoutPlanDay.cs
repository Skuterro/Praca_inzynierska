using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public enum WeekDayEnum
    {
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5,
        Saturday = 6,
        Sunday = 7
    }
    public class WorkoutPlanDay
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = null!;

        [Required]
        public WeekDayEnum WeekDay { get; set; }

        public int WorkoutPlanId { get; set; }
        public WorkoutPlan WorkoutPlan { get; set; } = null!;

        public ICollection<DayExercise> DayExercises { get; set; } = new List<DayExercise>();

        public ICollection<WorkoutSession> WorkoutSessions { get; set; } = new List<WorkoutSession>();
    }
}
