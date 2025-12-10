using System.ComponentModel.DataAnnotations;
using Api.Models.Entities;

namespace Api.Models.Requests.WorkoutPlanRequests
{
    public class CreateWorkoutPlanDayRequest
    {
        [Required(ErrorMessage = "Day name is required")]
        public string Name { get; set; } = null!;

        [Required]
        public int PlanId { get; set; }

        [Required]
        [EnumDataType(typeof(WeekDayEnum), ErrorMessage = "WeekDay must be a valid day of the week.")]
        public string WeekDay { get; set; } = null!;
    }
}
