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
        [Range(1, 10, ErrorMessage = "Sets must be between 1 and 10.")]
        public int Sets { get; set; }

        [Required]
        [Range(1, 30, ErrorMessage = "Min reps must be between 1 and 30.")]
        public int MinReps { get; set; }

        [Required]
        [Range(1, 30, ErrorMessage = "Max reps must be between 1 and 30.")]
        public int MaxReps { get; set; }
    }
}
