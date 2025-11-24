using System.ComponentModel.DataAnnotations;
using Api.Models.Entities;

namespace Api.Models.Requests.WorkoutSessionRequests
{
    public class StartWorkoutSessionRequest
    {
        [Required]
        public int WorkoutPlanDayId { get; set; }
    }
}
