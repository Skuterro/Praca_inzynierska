using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class WorkoutPlan
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = null!;

        public string UserId { get; set; } = null!;
        public User User { get; set; } = null!;

        public ICollection<WorkoutPlanDay> WorkoutPlanDays { get; set; } = new List<WorkoutPlanDay>();

        public DateTime CreatedAt { get; set; }

        public bool IsActive { get; set; }
    }
}
