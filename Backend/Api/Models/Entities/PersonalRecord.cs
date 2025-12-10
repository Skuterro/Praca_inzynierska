using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public enum PersonalRecordExerciseEnum
    {
        BenchPress = 1,
        Squat = 2,
        DeadLift = 3
    }

    public class PersonalRecord
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public User User { get; set; } = null!;

        [Required]
        public PersonalRecordExerciseEnum Exercise { get; set; }

        [Required]
        public decimal WeightKg { get; set; }

        public DateTime Date {  get; set; }
    }
}
