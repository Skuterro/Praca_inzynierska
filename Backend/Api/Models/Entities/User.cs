using Microsoft.AspNetCore.Identity;

namespace Api.Models.Entities
{
    public class User : IdentityUser
    {
        public ICollection<WorkoutPlan> WorkoutPlans { get; set; } = new List<WorkoutPlan>();
        public ICollection<BodyMeasurement> BodyMeasurements { get; set; } = new List<BodyMeasurement>();
        public ICollection<OneRepMax> OneRepMaxes { get; set; } = new List<OneRepMax>();
        public ICollection<WorkoutSession> WorkoutSessions { get; set; } = new List<WorkoutSession>();
    }
}
