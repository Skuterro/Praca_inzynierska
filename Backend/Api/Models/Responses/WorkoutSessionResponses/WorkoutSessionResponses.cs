namespace Api.Models.Responses.WorkoutSessionResponses
{
    public class StartWorkoutSessionResponse
    {
        public int SessionId { get; set; }
    }

    public class WorkoutSessionResponse
    {
        public int Id { get; set; }
        public string WorkoutPlanDayName { get; set; } = null!;
        public string WorkoutPlanName { get; set; } = null!;
        public bool IsFinished { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public class WorkoutSessionDetailsResponse
    {
        public int SessionId { get; set; }

        public List<WorkoutSessionExerciseResponse> Exercises { get; set; } = new List<WorkoutSessionExerciseResponse>();
    }
    public class WorkoutSessionExerciseResponse
    {
        public int DayExerciseId { get; set; }
        public List<WorkoutSessionSetResponse> Sets { get; set; } = new List<WorkoutSessionSetResponse>();
    }

    public class WorkoutSessionSetResponse
    {
        public int SetNumber { get; set; }
        public int Reps { get; set; }
        public decimal WeightKg { get; set; }

    }
}
