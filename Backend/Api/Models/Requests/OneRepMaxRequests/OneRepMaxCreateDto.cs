using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.OneRepMaxRequests
{
    public class OneRepMaxCreateDto
    {
        [Required]
        public int ExerciseId { get; set; }

        [Required(ErrorMessage = "Weight is required")]
        public decimal weightKg { get; set; }
    }
}
