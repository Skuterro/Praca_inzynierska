using System.ComponentModel.DataAnnotations;
using Api.Models.Entities;

namespace Api.Models.Requests.WorkoutPlanRequests
{
    public class WorkoutPlanDayCreateDto
    {
        [Required(ErrorMessage = "Day name is required")]
        public string Name { get; set; } = null!;

        [Required]
        [EnumDataType(typeof(WeekDay), ErrorMessage = "WeekDay must be a valid day of the week.")]
        public string WeekDay { get; set; } = null!;

        [Required]
        public List<DayExerciseCreateDto> DayExercises { get; set; } = new List<DayExerciseCreateDto>();
    }
}
