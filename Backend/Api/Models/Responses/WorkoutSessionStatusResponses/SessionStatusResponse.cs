namespace Api.Models.Responses.ActiveSessionResponses
{
    public enum SessionStatusEnum
    {
        StartWorkout = 1,    
        ContinueWorkout = 2,  
        FinishedWorkout = 3  
    }
    public class SessionStatusResponse
    {
        public SessionStatusEnum Status { get; set; }
        public int? SessionId { get; set; }
    }
}
