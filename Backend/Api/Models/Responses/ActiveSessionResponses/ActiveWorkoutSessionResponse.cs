namespace Api.Models.Responses.ActiveSessionResponses
{
    public class ActiveWorkoutSessionResponse
    {
        public int SessionId { get; set; }
        public List<ActiveWorkoutExerciseResponse> Exercises { get; set; } = new List<ActiveWorkoutExerciseResponse>();
    }
}
