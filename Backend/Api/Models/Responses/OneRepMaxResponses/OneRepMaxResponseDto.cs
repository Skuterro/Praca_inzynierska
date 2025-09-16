using Api.Models.Entities;

namespace Api.Models.Responses.OneRepMaxResponses
{
    public class OneRepMaxResponseDto
    {
        public int Id { get; set; }
        public string ExerciseName { get; set; } = null!;
        public decimal WeightKg { get; set; } 
    }
}
