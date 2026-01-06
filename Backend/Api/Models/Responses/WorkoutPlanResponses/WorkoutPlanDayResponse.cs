namespace Api.Models.Responses.WorkoutPlanResponses
{
    public class WorkoutPlanDayResponse
    {
        public int Id { get; set; }
        public List<DayExerciseResponse> DayExercises { get; set; } = new List<DayExerciseResponse>();
    }
}
