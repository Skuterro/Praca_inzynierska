namespace Api.Models.Responses.WorkoutSessionResponses
{
    public class WorkoutSessionResponse
    {
        public int Id { get; set; }
        public string WorkoutPlanDayName { get; set; } = null!;
        public int WorkoutPlanDayId { get; set; }
        public string WorkoutPlanName { get; set; } = null!;
        public bool IsFinished { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
