using Api.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Database
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<WorkoutPlan> WorkoutPlans { get; set; }
        public DbSet<WorkoutPlanDay> WorkoutPlanDays { get; set; }
        public DbSet<DayExercise> DayExercises { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<WorkoutSession> WorkoutSessions { get; set; }
        public DbSet<WorkoutSessionSet> WorkoutSessionSets { get; set; }
        public DbSet<BodyMeasurement> BodyMeasurements { get; set; }
        public DbSet<OneRepMax> OneRepMaxes { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<WorkoutPlan>()
                .HasOne(wp => wp.User)
                .WithMany(u => u.WorkoutPlans)
                .HasForeignKey(wp => wp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WorkoutPlanDay>()
                .HasOne(wpd => wpd.WorkoutPlan)
                .WithMany(wp => wp.WorkoutPlanDays)
                .HasForeignKey(wpd => wpd.WorkoutPlanId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DayExercise>()
                .HasOne(de => de.WorkoutPlanDay)
                .WithMany(wpd => wpd.DayExercises)
                .HasForeignKey(de => de.WorkoutPlanDayId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DayExercise>()
                .HasOne(de => de.Exercise)
                .WithMany()
                .HasForeignKey(de => de.ExerciseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WorkoutSession>()
                .HasOne(ws => ws.User)
                .WithMany(u => u.WorkoutSessions)
                .HasForeignKey(ws => ws.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WorkoutSession>()
                .HasOne(ws => ws.WorkoutPlanDay)
                .WithMany(wpd=> wpd.WorkoutSessions)
                .HasForeignKey(ws => ws.WorkoutPlanDayId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WorkoutSessionSet>()
                .HasOne(wss => wss.WorkoutSession)
                .WithMany(ws => ws.SessionSets)
                .HasForeignKey(wss => wss.WorkoutSessionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WorkoutSessionSet>()
                .HasOne(wss => wss.Exercise)
                .WithMany()
                .HasForeignKey(wss => wss.ExerciseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BodyMeasurement>()
                .HasOne(bm => bm.User)
                .WithMany(u => u.BodyMeasurements)
                .HasForeignKey(bm => bm.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OneRepMax>()
                .HasOne(orm => orm.User)
                .WithMany(u => u.OneRepMaxes)
                .HasForeignKey(orm => orm.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OneRepMax>()
                .HasOne(orm => orm.Exercise)
                .WithMany()
                .HasForeignKey(orm => orm.ExerciseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RefreshToken>()
                .HasOne(rt => rt.User)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);




            modelBuilder.Entity<Exercise>()
                .HasIndex(e => e.Name)
                .IsUnique();
        }
    }
}
