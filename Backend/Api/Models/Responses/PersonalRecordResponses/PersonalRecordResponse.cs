using Api.Models.Entities;

namespace Api.Models.Responses.OneRepMaxResponses
{
    public class PersonalRecordResponse
    {
        public int Id { get; set; }
        public PersonalRecordExerciseEnum Exercise { get; set; }
        public decimal WeightKg { get; set; }
        public DateTime Date { get; set; }
    }
}
