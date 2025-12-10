namespace Api.Models.Responses.WorkoutPlanResponses
{
    public class SimpleWorkoutPlanDayResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string WeekDay { get; set; } = null!;
    }
}
