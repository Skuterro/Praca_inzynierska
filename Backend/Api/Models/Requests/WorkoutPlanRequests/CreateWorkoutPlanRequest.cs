using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.WorkoutPlanRequests
{
    public class CreateWorkoutPlanRequest
    {
        [Required(ErrorMessage = "Plan name is required")]
        public string Name { get; set; } = null!;
    }
}
