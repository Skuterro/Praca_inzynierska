using System.ComponentModel.DataAnnotations;
using Api.Models.Entities;

namespace Api.Models.Requests.ExerciseRequests
{
    public class ExerciseCreateDto
    {
        [Required(ErrorMessage = "Exercise name is required")]
        public string Name { get; set; } = null!;
        [Required]
        [EnumDataType(typeof(BodyPartEnum), ErrorMessage = "Body part must be a valid part of the body.")]
        public string BodyPart { get; set; }
        public string? Description { get; set; }
    }
}
