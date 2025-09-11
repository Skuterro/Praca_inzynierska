using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.WorkoutPlanRequests
{
    public class DayExerciseCreateDto
    {
        [Required]
        public int ExerciseId { get; set; }

        [Required]
        public int Sets { get; set; }

        [Required]
        public int Reps { get; set; }
    }
}
