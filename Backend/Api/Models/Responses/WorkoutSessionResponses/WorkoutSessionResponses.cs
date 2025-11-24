namespace Api.Models.Responses.WorkoutSessionResponses
{
    public class StartWorkoutSessionResponse
    {
        public int SessionId { get; set; }
    }

    public class WorkoutSessionResponseDto
    {
        public int Id { get; set; }
        public string WorkoutPlanDayName { get; set; } = null!;
        public string WorkoutPlanName { get; set; } = null!;
        public bool IsFinished { get; set; }
        //public DateTime SessionDate { get; set; }
        //public List<WorkoutSessionExerciseDto> Exercises { get; set; } = new List<WorkoutSessionExerciseDto>();
    }
    public class WorkoutSessionExerciseResponseDto
    {
        public int Id { get; set; }
        public string ExerciseName { get; set; } = null!;
        public List<WorkoutSessionSetResponseDto> Sets { get; set; } = new List<WorkoutSessionSetResponseDto>();
    }

    public class WorkoutSessionSetResponseDto
    {
        public int Id { get; set; }
        public int SetNumber { get; set; }
        public int Reps { get; set; }
        public decimal WeightKg { get; set; }

    }
}
