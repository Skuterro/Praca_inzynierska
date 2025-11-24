using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.WorkoutSessionRequests
{
    public class FinishWorkoutSessionRequest
    {
        [Required]
        public int SessionId { get; set; }
    }
}
