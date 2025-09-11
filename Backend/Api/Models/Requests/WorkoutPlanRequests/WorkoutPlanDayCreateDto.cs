using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.WorkoutPlanRequests
{
    public class WorkoutPlanDayCreateDto
    {
        [Required(ErrorMessage = "Day name is required")]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(9)]
        public string WeekDay { get; set; } = null!;

        [Required]
        public List<DayExerciseCreateDto> DayExercises { get; set; } = new List<DayExerciseCreateDto>();
    }
}
