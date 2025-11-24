using Api.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace Api.Models.Requests.WorkoutSessionRequests
{
    public class AddWorkouSessionSetRequest
    {
        [Required]
        public int WorkoutSessionId { get; set; }

        [Required]
        public int DayExerciseId { get; set; }

        [Required]
        public int SetNumber { get; set; }

        [Required]
        public int Reps { get; set; }

        [Required]
        public decimal WeightKg { get; set; }

    }
}
