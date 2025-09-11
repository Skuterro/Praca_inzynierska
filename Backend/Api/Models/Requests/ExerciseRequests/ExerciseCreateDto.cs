using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.ExerciseRequests
{
    public class ExerciseCreateDto
    {
        [Required(ErrorMessage = "Exercise name is required")]
        public string Name { get; set; } = null!;

        public string? Description { get; set; }
    }
}
