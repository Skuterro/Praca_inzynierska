namespace Api.Models.Responses.WorkoutSessionResponses
{
    public class WorkoutSessionDetailsResponse
    {
        public int SessionId { get; set; }
        public bool IsFinished { get; set; }
        public List<WorkoutSessionExerciseResponse> Exercises { get; set; } = new List<WorkoutSessionExerciseResponse>();
    }
}
