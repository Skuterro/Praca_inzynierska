using System.ComponentModel.DataAnnotations;
using Api.Models.Entities;

namespace Api.Models.Requests.WorkoutSessionRequests
{
    public class WorkoutSessionCreateDto
    {
        [Required]
        public int WorkoutPlanDayId { get; set; }
    }
}
