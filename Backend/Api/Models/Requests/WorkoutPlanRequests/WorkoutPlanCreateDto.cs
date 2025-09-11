using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.WorkoutPlanRequests
{
    public class WorkoutPlanCreateDto
    {
        [Required(ErrorMessage = "Plan name is required")]
        public string Name { get; set; } = null!;

        public List<WorkoutPlanDayCreateDto> WorkoutDays { get; set; } = new List<WorkoutPlanDayCreateDto>();
    }
}
