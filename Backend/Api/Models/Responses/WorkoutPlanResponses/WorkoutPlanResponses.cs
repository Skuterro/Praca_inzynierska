namespace Api.Models.Responses.WorkoutPlanResponses
{
    public class WorkoutPlanResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public List<WorkoutPlanDayResponseDto> WorkoutPlanDays { get; set; } = new List<WorkoutPlanDayResponseDto>();
    }
    public class WorkoutPlanDayResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string WeekDay { get; set; } = null!;
        //public List<DayExerciseResponseDto> DayExercises { get; set; } = new List<DayExerciseResponseDto>();
    }
    public class DayExerciseResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Sets { get; set; }
        //public int Reps { get; set; }
    }
}
