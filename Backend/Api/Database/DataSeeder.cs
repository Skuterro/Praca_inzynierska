using Api.Models.Entities;

namespace Api.Database
{
    public static class DataSeeder
    {
        public static void Seed(AppDbContext dbContext)
        {
            if (dbContext.Exercises.Any())
            {
                return;
            }

            var exercises = new List<Exercise>
            {
                new Exercise { Name = "Bench Press (Barbell)", BodyPart = BodyPartEnum.Chest },
                new Exercise { Name = "Incline Bench Press (Dumbbell)", BodyPart = BodyPartEnum.Chest },
                new Exercise { Name = "Cable Flys", BodyPart = BodyPartEnum.Chest },
                new Exercise { Name = "Push Ups", BodyPart = BodyPartEnum.Chest },
                new Exercise { Name = "Dips", BodyPart = BodyPartEnum.Chest },

                new Exercise { Name = "Pull Up", BodyPart = BodyPartEnum.Back },
                new Exercise { Name = "Lat Pulldown", BodyPart = BodyPartEnum.Back },
                new Exercise { Name = "Barbell Row", BodyPart = BodyPartEnum.Back },
                new Exercise { Name = "Seated Cable Row", BodyPart = BodyPartEnum.Back },

                new Exercise { Name = "Deadlift", BodyPart = BodyPartEnum.Back },
                new Exercise { Name = "Squat (Barbell)", BodyPart = BodyPartEnum.Legs },
                new Exercise { Name = "Leg Press", BodyPart = BodyPartEnum.Legs },
                new Exercise { Name = "Lunges", BodyPart = BodyPartEnum.Legs },
                new Exercise { Name = "Leg Extension", BodyPart = BodyPartEnum.Legs },
                new Exercise { Name = "Romanian Deadlift", BodyPart = BodyPartEnum.Legs },
                new Exercise { Name = "Calf Raises", BodyPart = BodyPartEnum.Legs },

                new Exercise { Name = "Overhead Press (Barbell)", BodyPart = BodyPartEnum.Shoulders },
                new Exercise { Name = "Arnold Press", BodyPart = BodyPartEnum.Shoulders },
                new Exercise { Name = "Lateral Raises", BodyPart = BodyPartEnum.Shoulders },
                new Exercise { Name = "Face Pulls", BodyPart = BodyPartEnum.Shoulders },

                new Exercise { Name = "Bicep Curl (Barbell)", BodyPart = BodyPartEnum.Arms },
                new Exercise { Name = "Hammer Curl", BodyPart = BodyPartEnum.Arms },
                new Exercise { Name = "Tricep Pushdown", BodyPart = BodyPartEnum.Arms },
                new Exercise { Name = "Skullcrushers", BodyPart = BodyPartEnum.Arms },

                new Exercise { Name = "Plank", BodyPart = BodyPartEnum.Core },
                new Exercise { Name = "Crunches", BodyPart = BodyPartEnum.Core },
                new Exercise { Name = "Leg Raises", BodyPart = BodyPartEnum.Core }
            };

            dbContext.Exercises.AddRange(exercises);
            dbContext.SaveChanges();
        }
    }
}
