namespace Api.Models.Responses.WorkoutSessionResponses
{
    public class WorkoutSessionResponseDto
    {
        public int Id { get; set; }
        public string WorkoutPlanDayName { get; set; } = null!;
        public DateTime SessionDate { get; set; }
        public List<WorkoutSessionExerciseDto> Exercises { get; set; } = new List<WorkoutSessionExerciseDto>();
    }
    public class WorkoutSessionExerciseDto
    {
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; } = null!;
        public List<SessionSetResponseDto> Sets { get; set; } = new();
    }

    public class SessionSetResponseDto
    {
        public int Id { get; set; }
        public int SetNumber { get; set; }
        public int Reps { get; set; }
        public decimal WeightKg { get; set; }

    }
}
