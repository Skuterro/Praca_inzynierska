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

        public ICollection<WorkoutSessionSet> SessionSets { get; set; } = new List<WorkoutSessionSet>();

        public DateTime SessionDate { get; set; }
    }
}
