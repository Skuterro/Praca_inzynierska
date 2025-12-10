namespace Api.Models.Responses.WorkoutPlanResponses
{
    public class WorkoutPlanDayResponse
    {
        public List<DayExerciseResponse> DayExercises { get; set; } = new List<DayExerciseResponse>();
    }
}
