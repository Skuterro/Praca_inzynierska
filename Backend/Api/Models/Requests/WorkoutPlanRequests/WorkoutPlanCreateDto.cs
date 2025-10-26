using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.WorkoutPlanRequests
{
    public class WorkoutPlanCreateDto
    {
        [Required(ErrorMessage = "Plan name is required")]
        public string Name { get; set; } = null!;
    }
}
