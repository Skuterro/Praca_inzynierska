using System.ComponentModel.DataAnnotations;
using Api.Models.Entities;

namespace Api.Models.Requests.OneRepMaxRequests
{
    public class PersonalRecordRequest
    {
        [Required]
        public PersonalRecordExerciseEnum Exercise{ get; set; }

        [Required(ErrorMessage = "Weight is required")]
        public decimal WeightKg { get; set; }
    }
}
