using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.QueryParams;
using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.ActiveSessionResponses;
using Api.Models.Responses.WorkoutSessionResponses;
using Api.Services.Impl;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NSubstitute;

namespace Api.Tests
{
    [TestClass]
    public class WorkoutSessionServiceTests
    {
        private IWorkoutSessionService _workoutSessionService;
        private AppDbContext _context;
        private IMapper _mapperMock;

        [TestInitialize]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            var workoutPlan = new WorkoutPlan
            {
                Id = 1,
                UserId = "1",
                Name = "TestPlan1",
                CreatedAt = new DateTime(),
                IsActive = true
            };
            var workoutPlanDay = new WorkoutPlanDay
            {
                Id = 1,
                Name = "TestDay1",
                WeekDay = WeekDayEnum.Monday,
                WorkoutPlanId = 1
            };
            var exercise = new Exercise { Id = 1, Name = "Bench Press", BodyPart = BodyPartEnum.Chest };
            var dayExercise = new DayExercise { Id = 1, ExerciseId = 1, WorkoutPlanDayId = 1, Sets = 3 };
            var session = new WorkoutSession
            {
                Id = 1,
                UserId = "1",
                WorkoutPlanDayId = 1,
                Start = new DateTime(),
                IsFinished = false
            };
            _context.Add(workoutPlan);
            _context.Add(workoutPlan);
            _context.Add(workoutPlanDay);
            _context.Add(dayExercise);
            _context.Add(session);
            _context.SaveChanges();

            _mapperMock = Substitute.For<IMapper>();
            _workoutSessionService = new WorkoutSessionService(_context, _mapperMock);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        [TestMethod]
        public async Task StartWorkoutSessionAsync_ShouldStartWorkoutSession_WhenPlanDayExists()
        {
            var userId = "1";
            var request = new StartWorkoutSessionRequest { WorkoutPlanDayId = 1 };
            var entity = new WorkoutSession { Id = 2, UserId = "1", WorkoutPlanDayId = 1, Start = new DateTime() };

            _mapperMock.Map<WorkoutSession>(request).Returns(entity);

            var result = await _workoutSessionService.StartWorkoutSessionAsync(userId, request);
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.SessionId);
        }

        [TestMethod]
        public async Task StartWorkoutSessionAsync_ShouldThrowBadRequest_WhenPlanDayDoesntExist()
        {
            var userId = "1";
            var request = new StartWorkoutSessionRequest { WorkoutPlanDayId = 3 };
            var entity = new WorkoutSession { Id = 2, UserId = "1", WorkoutPlanDayId = 1, Start = new DateTime() };

            _mapperMock.Map<WorkoutSession>(request).Returns(entity);

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutSessionService.StartWorkoutSessionAsync(userId, request));
        }

        [TestMethod]
        public async Task AddSetAsync_ShouldAddSetToSession_WhenSessionExistAndUserIsOwner()
        {
            var userId = "1";
            var request = new AddWorkouSessionSetRequest { WorkoutSessionId = 1, DayExerciseId = 1, SetNumber = 1, Reps = 8, WeightKg = 80 };
            var entity = new WorkoutSessionSet { Id = 1, WorkoutSessionExerciseId = 1, SetNumber = 1, };
            
            _mapperMock.Map<WorkoutSessionSet>(request).Returns(entity);

            await _workoutSessionService.AddSetAsync(userId, request);

            var sessionExercise = await _context.WorkoutSessionExercises.FirstOrDefaultAsync(se => se.DayExerciseId == 1);
            Assert.IsNotNull(sessionExercise);
            var savedSet = await _context.WorkoutSessionSets.FirstOrDefaultAsync();
            Assert.AreEqual(sessionExercise.Id, savedSet.WorkoutSessionExerciseId);

        }

        [TestMethod]
        public async Task AddSetAsync_ShouldThrowBadRequest_WhenUserIsNotOwner()
        {
            var userId = "2";
            var request = new AddWorkouSessionSetRequest { WorkoutSessionId = 1, DayExerciseId = 1, SetNumber = 1, Reps = 8, WeightKg = 80 };
            var entity = new WorkoutSessionSet { Id = 1, WorkoutSessionExerciseId = 1, SetNumber = 1, };

            _mapperMock.Map<WorkoutSessionSet>(request).Returns(entity);

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutSessionService.AddSetAsync(userId, request));
        }

        [TestMethod]
        public async Task AddSetAsync_ShouldThrowBadRequest_WhenSessionDoesntExist()
        {
            var userId = "1";
            var request = new AddWorkouSessionSetRequest { WorkoutSessionId = 2, DayExerciseId = 1, SetNumber = 1, Reps = 8, WeightKg = 80 };
            var entity = new WorkoutSessionSet { Id = 1, WorkoutSessionExerciseId = 1, SetNumber = 1, };

            _mapperMock.Map<WorkoutSessionSet>(request).Returns(entity);

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutSessionService.AddSetAsync(userId, request));
        }

        [TestMethod]
        public async Task FinishWorkoutSessionAsync_ShouldFinishSession_WhenUserIsOwnerAndSessionExists()
        {
            var userId = "1";
            var request = new FinishWorkoutSessionRequest { SessionId = 1 };

            await _workoutSessionService.FinishWorkoutSessionAsync(userId, request);

            var session = await _context.WorkoutSessions.FindAsync(1);
            Assert.IsTrue(session.IsFinished);
            Assert.IsNotNull(session.End);
        }

        [TestMethod]
        public async Task FinishWorkoutSessionAsync_ShouldThrowBadRequest_WhenUserIsNotOwner()
        {
            var userId = "2";
            var request = new FinishWorkoutSessionRequest { SessionId = 1 };

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutSessionService.FinishWorkoutSessionAsync(userId, request));
        }

        [TestMethod]
        public async Task FinishWorkoutSessionAsync_ShouldThrowBadRequest_WhenSessionDoesntExist()
        {
            var userId = "1";
            var request = new FinishWorkoutSessionRequest { SessionId = 3 };

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutSessionService.FinishWorkoutSessionAsync(userId, request));
        }

        [TestMethod]
        public async Task GetTodaySessionStatusAsync_ShouldReturnStart_WhenNoSessionsExist()
        {
            var userId = "1";
            var result = await _workoutSessionService.GetTodaySessionStatusAsync(userId);

            Assert.AreEqual(SessionStatusEnum.StartWorkout, result.Status);
        }

        [TestMethod]
        public async Task GetTodaySessionStatusAsync_ShouldReturnContinue_WhenActiveSessionIsFromToday()
        {
            var userId = "1";
            var today = DateTime.UtcNow;
            _context.WorkoutSessions.Add(new WorkoutSession
            {
                Id = 2,
                UserId = userId,
                Start = today,
                IsFinished = false
            });
            await _context.SaveChangesAsync();

            var result = await _workoutSessionService.GetTodaySessionStatusAsync(userId);

            Assert.AreEqual(SessionStatusEnum.ContinueWorkout, result.Status);
            Assert.AreEqual(2, result.SessionId);
        }

        [TestMethod]
        public async Task GetTodaySessionStatusAsync_ShouldAutoFinish_WhenActiveSessionIsFromYesterday()
        {
            var userId = "1";
            var yesterday = DateTime.UtcNow.AddDays(-1);
            var session = new WorkoutSession
            {
                Id = 2,
                UserId = userId,
                Start = yesterday,
                IsFinished = false
            };
            _context.WorkoutSessions.Add(session);
            await _context.SaveChangesAsync();

            var result = await _workoutSessionService.GetTodaySessionStatusAsync(userId);

            Assert.AreEqual(SessionStatusEnum.StartWorkout, result.Status);
            var updatedSession = await _context.WorkoutSessions.FindAsync(2);
            Assert.IsTrue(updatedSession.IsFinished);
            Assert.IsNotNull(updatedSession.End);
        }

        [TestMethod]
        public async Task GetAllUserWorkoutSessionsAsync_ShouldReturnUserSessions_WhenUserHaveSessions()
        {
            var userId = "1";
            var queryParams = new QueryParams { PageNumber = 1 };
            var response = new List<WorkoutSessionResponse>
            {
                new WorkoutSessionResponse
                {
                    Id = 1,
                    WorkoutPlanDayId = 1,
                    Start = new DateTime(),
                    IsFinished = false
                }
            };
            _mapperMock.Map<List<WorkoutSessionResponse>>(Arg.Any<List<WorkoutSession>>())
               .Returns(response);

            var result = await _workoutSessionService.GetAllUserWorkoutSessionsAsync(userId, queryParams);

            Assert.AreEqual(1, result.Items.Count());
            Assert.AreEqual(1, result.Items.First().WorkoutPlanDayId);
        }

        [TestMethod]
        public async Task GetWorkoutSessionDetailsByIdAsync_ShouldReturnNestedData()
        {
            var userId = "1";
            var session = new WorkoutSession { Id = 2, UserId = userId, IsFinished = true, WorkoutPlanDayId = 1 };
            var sessionEx = new WorkoutSessionExercise { Id = 2, WorkoutSessionId = 2, DayExerciseId = 1 };
            var set = new WorkoutSessionSet { Id = 1, WorkoutSessionExerciseId = 2, SetNumber = 1, Reps = 12, WeightKg = 80 };

            _context.WorkoutSessions.Add(session);
            _context.WorkoutSessionExercises.Add(sessionEx);
            _context.WorkoutSessionSets.Add(set);
            await _context.SaveChangesAsync();

            var result = await _workoutSessionService.GetWorkoutSessionDetailsByIdAsync(userId, 2);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Exercises.Count);
            Assert.AreEqual(1, result.Exercises[0].Sets.Count);
            Assert.AreEqual(80, result.Exercises[0].Sets[0].WeightKg);
        }
    }
}
