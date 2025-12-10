namespace Api.Models.Responses.WorkoutSessionResponses
{
    public class WorkoutSessionExerciseResponse
    {
        public int DayExerciseId { get; set; }
        public List<WorkoutSessionSetResponse> Sets { get; set; } = new List<WorkoutSessionSetResponse>();
    }
}
