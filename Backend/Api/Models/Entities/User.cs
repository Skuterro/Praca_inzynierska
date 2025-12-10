using Microsoft.AspNetCore.Identity;

namespace Api.Models.Entities
{
    public class User : IdentityUser
    {
        public ICollection<WorkoutPlan> WorkoutPlans { get; set; } = new List<WorkoutPlan>();
        public ICollection<BodyMeasurements> BodyMeasurements { get; set; } = new List<BodyMeasurements>();
        public ICollection<PersonalRecord> PersonalRecords { get; set; } = new List<PersonalRecord>();
        public ICollection<WorkoutSession> WorkoutSessions { get; set; } = new List<WorkoutSession>();
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
