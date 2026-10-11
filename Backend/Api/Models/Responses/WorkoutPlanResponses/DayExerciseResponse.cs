namespace Api.Models.Responses.WorkoutPlanResponses
{
    public class DayExerciseResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string BodyPart { get; set; } = null!;
        public int Sets { get; set; }
        public int MinReps { get; set; }
        public int MaxReps { get; set; }
    }
}
