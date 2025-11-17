namespace Api.Models.Responses.ExerciseResponses
{
    public class ExerciseResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string BodyPart { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
