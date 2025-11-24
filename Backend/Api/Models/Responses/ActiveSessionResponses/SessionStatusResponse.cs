namespace Api.Models.Responses.ActiveSessionResponses
{
    public enum SessionStatusEnum
    {
        StartWorkout,    
        ContinueWorkout,  
        FinishedWorkout  
    }
    public class SessionStatusResponse
    {
        public SessionStatusEnum Status { get; set; }
        public int? SessionId { get; set; }
    }
}
