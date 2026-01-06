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
        public DbSet<WorkoutSessionExercise> WorkoutSessionExercises { get; set; }
        public DbSet<WorkoutSessionSet> WorkoutSessionSets { get; set; }
        public DbSet<BodyMeasurements> BodyMeasurements { get; set; }
        public DbSet<PersonalRecord> PersonalRecords { get; set; }
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

            modelBuilder.Entity<WorkoutSession>()
                .HasMany(ws => ws.SessionExercises)
                .WithOne(se => se.WorkoutSession)
                .HasForeignKey(we => we.WorkoutSessionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WorkoutSessionExercise>()
                .HasOne(wse => wse.DayExercise)
                .WithMany()
                .HasForeignKey(wse => wse.DayExerciseId);

            modelBuilder.Entity<WorkoutSessionExercise>()
                .HasMany(wse => wse.Sets)
                .WithOne(wss => wss.WorkoutSessionExercise)
                .HasForeignKey(wss => wss.WorkoutSessionExerciseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BodyMeasurements>()
                .HasOne(bm => bm.User)
                .WithOne(u => u.BodyMeasurements)
                .HasForeignKey<BodyMeasurements>(bm => bm.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PersonalRecord>()
                .HasOne(pr => pr.User)
                .WithMany(u => u.PersonalRecords)
                .HasForeignKey(pr => pr.UserId)
                .OnDelete(DeleteBehavior.Cascade);

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
