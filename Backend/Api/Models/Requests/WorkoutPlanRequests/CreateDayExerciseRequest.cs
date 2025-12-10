using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.WorkoutPlanRequests
{
    public class CreateDayExerciseRequest
    {
        [Required]
        public int ExerciseId { get; set; }

        [Required]
        public int DayId { get; set; }

        [Required]
        public int Sets { get; set; }
    }
}
