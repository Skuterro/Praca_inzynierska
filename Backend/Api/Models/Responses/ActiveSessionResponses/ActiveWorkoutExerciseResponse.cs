namespace Api.Models.Responses.ActiveSessionResponses
{
    public class ActiveWorkoutExerciseResponse
    {
        public int DayExerciseId { get; set; }
        public string ExerciseName { get; set; } = null!;
        public int PlannedSets { get; set; }
        public List<ActiveWorkoutSetResponse> Sets { get; set; } = new List<ActiveWorkoutSetResponse>();
    }
}
