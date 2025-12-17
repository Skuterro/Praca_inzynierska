using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Responses.WorkoutPlanResponses;
using Api.Services.Impl;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NSubstitute;

namespace Api.Tests
{
    [TestClass]
    public class WorkoutPlanServiceTests
    {
        private IWorkoutPlanService _workoutPlanService;
        private AppDbContext _context;
        private IMapper _mapperMock;

        [TestInitialize]
        public void SetupI()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            var workoutPlans = new List<WorkoutPlan>
            {
                new WorkoutPlan { Id = 1, UserId = "1", Name = "TestPlan1", CreatedAt = new DateTime(), IsActive = true },
                new WorkoutPlan { Id = 2, UserId = "2", Name = "TestPlan2", CreatedAt = new DateTime(), IsActive = false }
            };

            var workoutPlanDays = new List<WorkoutPlanDay>
            {
                new WorkoutPlanDay { Id = 1, Name = "TestDay1", WeekDay = WeekDayEnum.Monday, WorkoutPlanId = 1 },
                new WorkoutPlanDay { Id = 2, Name = "TestDay2", WeekDay = WeekDayEnum.Tuesday, WorkoutPlanId = 2 }
            };

            var exercise = new Exercise { Id = 1, Name = "Bench Press", BodyPart = BodyPartEnum.Chest };
            var dayExercise = new DayExercise { Id = 1, ExerciseId = 1, WorkoutPlanDayId = 1, Sets = 3 };

            _context.Exercises.Add(exercise);
            _context.WorkoutPlans.AddRange(workoutPlans);
            _context.WorkoutPlanDays.AddRange(workoutPlanDays);
            _context.Add(dayExercise);
            _context.SaveChanges();

            _context.ChangeTracker.Clear();

            _mapperMock = Substitute.For<IMapper>();
            _workoutPlanService = new WorkoutPlanService(_context, _mapperMock);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        [TestMethod]
        public async Task CreateEmptyWorkoutPlanAsync_ShouldEmptyPlan_WhenValidRequest()
        {
            var userId = "1";
            var request = new CreateWorkoutPlanRequest { Name = "TestPlan3" };
            var entity = new WorkoutPlan { Id = 3, UserId = userId, Name = "TestPlan3", CreatedAt = new DateTime(), IsActive = false };
            var response = new WorkoutPlanResponse { Id = 3, Name = "TestPlan3", CreatedAt = new DateTime(), IsActive = false };

            _mapperMock.Map<WorkoutPlan>(request).Returns(entity);
            _mapperMock.Map<WorkoutPlanResponse>(entity).Returns(response);

            var result = await _workoutPlanService.CreateEmptyWorkoutPlanAsync(userId, request);

            Assert.IsNotNull(result);
            Assert.AreEqual("TestPlan3", request.Name);
            var dbCount = await _context.WorkoutPlans.CountAsync();
            Assert.AreEqual(3, dbCount);
        }

        [TestMethod]
        public async Task AddDayToPlanAsync_ShouldAddDay_WhenDayDoesNotExistAndValidRequest()
        {
            var userId = "1";
            var request = new CreateWorkoutPlanDayRequest { PlanId = 1, Name = "PushDay", WeekDay = "Friday" };
            var entity = new WorkoutPlanDay { Id = 3, Name = "PushDay", WeekDay = WeekDayEnum.Friday, WorkoutPlanId = 1 };

            _mapperMock.Map<SimpleWorkoutPlanDayResponse>(Arg.Any<WorkoutPlanDay>())
                .Returns(new SimpleWorkoutPlanDayResponse { Name = "PushDay" });

            var result = await _workoutPlanService.AddDayToPlanAsync(userId, request);

            Assert.IsNotNull(result);
            var count = await _context.WorkoutPlanDays.CountAsync();
            Assert.AreEqual(3, count);
        }

        [TestMethod]
        public async Task AddDayToPlanAsync_ShouldThrowBadRequest_WhenPlanDoesntExist()
        {
            var userId = "1";
            var request = new CreateWorkoutPlanDayRequest { PlanId = 3, Name = "PushDay", WeekDay = "Monday" };

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.AddDayToPlanAsync(userId, request));
        }

        [TestMethod]
        public async Task AddDayToPlanAsync_ShouldThrowBadRequest_WhenInvalidWeekday()
        {
            var userId = "1";
            var request = new CreateWorkoutPlanDayRequest { PlanId = 1, Name = "PushDay", WeekDay = "InvalidDay" };

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.AddDayToPlanAsync(userId, request));
        }

        [TestMethod]
        public async Task AddDayToPlanAsync_ShouldThrowBadRequest_WhenDayAlreadyExists()
        {
            var userId = "1";
            var request = new CreateWorkoutPlanDayRequest { PlanId = 1, Name = "PushDay", WeekDay = "Monday" };

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.AddDayToPlanAsync(userId, request));
        }

        [TestMethod]
        public async Task AddExerciseToDayAsync_ShouldAdd_WhenExerciseExists()
        {
            var userId = "2";
            var request = new CreateDayExerciseRequest { ExerciseId = 1, DayId = 2, Sets = 4 };

            _mapperMock.Map<DayExerciseResponse>(Arg.Any<DayExercise>())
                       .Returns(new DayExerciseResponse { Sets = 4 });

            var result = await _workoutPlanService.AddExerciseToDayAsync(userId, request);

            Assert.IsNotNull(result);


            var count = await _context.DayExercises.CountAsync(de => de.WorkoutPlanDayId == 2);
            Assert.AreEqual(1, count);
        }

        [TestMethod]
        public async Task AddExerciseToDayAsync_ShouldThrowBadRequest_WhenPlanDayDoesntExist()
        {
            var userId = "1";
            var request = new CreateDayExerciseRequest { ExerciseId = 1, DayId = 3, Sets = 4 };

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.AddExerciseToDayAsync(userId, request));
        }

        [TestMethod]
        public async Task AddExerciseToDayAsync_ShouldThrowBadRequest_WhenExerciseDoesntExist()
        {
            var userId = "1";
            var request = new CreateDayExerciseRequest { ExerciseId = 3, DayId = 1, Sets = 4 };

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.AddExerciseToDayAsync(userId, request));
        }

        [TestMethod]
        public async Task ToggleWorkoutPlanAsync_ShouldActivatePlan_UserIsOwnerAndPlanExists()
        {
            var userId = "2";
            await _workoutPlanService.ToggleWorkoutPlanAsync(userId, 2);

            var newActivePlan = await _context.WorkoutPlans.FirstOrDefaultAsync(wp => wp.IsActive == true && wp.UserId == userId);
            var oldActivePlan = await _context.WorkoutPlans.FirstOrDefaultAsync(wp => wp.IsActive == false && wp.UserId == userId);

            Assert.AreEqual(true, newActivePlan.IsActive);
            Assert.AreEqual(2, newActivePlan.Id);
        }

        [TestMethod]
        public async Task ToggleWorkoutPlanAsync_ShouldThrowBadRequest_UserIsNotOwner()
        {
            var userId = "1";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.ToggleWorkoutPlanAsync(userId, 2));
        }

        [TestMethod]
        public async Task ToggleWorkoutPlanAsync_ShouldThrowBadRequest_PlanDoesntExist()
        {
            var userId = "1";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.ToggleWorkoutPlanAsync(userId, 3));
        }

        [TestMethod]
        public async Task GetWorkoutPlanByWeekDayAsync_ShouldReturnDay_WhenPlanIsActiveAndDayExists()
        {
            var dayIndex = 1;
            var userId = "1";
            var expectedResponse = new WorkoutPlanDayResponse
            {
                DayExercises = new List<DayExerciseResponse>
                {
                    new DayExerciseResponse{ Id = 1,  Name = "Bench Press", BodyPart = "Chest", Sets = 3 }
                }

            };
            _mapperMock.Map<WorkoutPlanDayResponse>(Arg.Any<WorkoutPlanDay>()).Returns(expectedResponse);

            var result = await _workoutPlanService.GetWorkoutPlanByWeekDayAsync(userId, dayIndex);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.DayExercises[0].Id);
            Assert.AreEqual("Bench Press", result.DayExercises[0].Name);
        }

        [TestMethod]
        public async Task GetWorkoutPlanByWeekDayAsync_ShouldThrowBadRequest_WhenPlanIsInactive()
        {
            var dayIndex = 2;
            var userId = "2";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.GetWorkoutPlanByWeekDayAsync(userId, dayIndex));
        }

        [TestMethod]
        public async Task GetUserWorkoutPlansAsync_ShouldReturnUserPlans_WhenPlansExist()
        {
            var userId = "1";
            var response = new List<WorkoutPlanResponse>
            {
                new WorkoutPlanResponse{ Id = 1, Name = "TestPlan1", CreatedAt = new DateTime(), IsActive = true }
            };
            _mapperMock.Map<List<WorkoutPlanResponse>>(Arg.Any<List<WorkoutPlan>>()).Returns(response);

            var result = await _workoutPlanService.GetUserWorkoutPlansAsync(userId);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count());
        }

        [TestMethod]
        public async Task GetWorkoutPlanDaysAsync_ShouldReturnListOfDays_WhenPlanExistAndUserIsOwner()
        {
            var userId = "1";
            var response = new List<SimpleWorkoutPlanDayResponse>
            {
                new SimpleWorkoutPlanDayResponse { Id = 1, Name = "TestDay1", WeekDay = "Monday"}
            };

            _mapperMock.Map<List<SimpleWorkoutPlanDayResponse>>(Arg.Any<List<WorkoutPlanDay>>())
                       .Returns(response);

            var result = await _workoutPlanService.GetWorkoutPlanDaysAsync(userId, 1);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count());
        }

        [TestMethod]
        public async Task GetWorkoutPlanDaysAsync_SShouldThrowBadRequest_WhenPlanDoesntExist()
        {
            var userId = "1";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.GetWorkoutPlanDaysAsync(userId, 3));
        }

        [TestMethod]
        public async Task GetWorkoutPlanDaysAsync_ShouldThrowBadRequest_WhenUserIsNotOwner()
        {
            var userId = "1";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.GetWorkoutPlanDaysAsync(userId, 2));
        }

        [TestMethod]
        public async Task GetWorkoutPlanDayExercisesAsync_ShouldReturnListOfExercises_WhenWorkoutDayExist()
        {
            var userId = "1";
            var response = new List<DayExerciseResponse>
            {
                new DayExerciseResponse { Id = 1, Name = "Bench Press", BodyPart = "Chest", Sets = 3}
            };

            _mapperMock.Map<List<DayExerciseResponse>>(Arg.Any<List<DayExercise>>())
                       .Returns(response);

            var result = await _workoutPlanService.GetWorkoutPlanDayExercisesAsync(userId, 1);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count());
        }

        [TestMethod]
        public async Task GetWorkoutPlanDayExercisesAsync_ShouldThrowBadRequest_WhenPlanDayDoesntExist()
        {
            var userId = "1";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.GetWorkoutPlanDayExercisesAsync(userId, 3));
        }

        [TestMethod]
        public async Task DeleteWorkoutPlanAsync_ShouldDeletePlan_WhenPlanExistsAndUserIsOwner()
        {
            var userId = "1";   
            await _workoutPlanService.DeleteWorkoutPlanAsync(userId, 1);

            var deletedEntity = await _context.WorkoutPlans.FindAsync(1);
            Assert.IsNull(deletedEntity);
            var dbCount = await _context.Exercises.CountAsync();
            Assert.AreEqual(1, dbCount);
        }

        [TestMethod]
        public async Task DeleteWorkoutPlanAsync_ShouldThrowBadRequest_WhenUserIsNotOwner()
        {
            var userId = "1";
            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.DeleteWorkoutPlanAsync(userId, 2));
        }

        [TestMethod]
        public async Task DeleteWorkoutPlanAsync_ShouldThrowBadRequest_WhenPlanDoesntExist()
        {
            var userId = "1";
            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.DeleteWorkoutPlanAsync(userId, 3));
        }

        [TestMethod]
        public async Task DeleteWorkoutPlanDayAsync_ShouldDeletePlanDay_WhenPlanDayExistsAndUserIsOwner()
        {
            var userId = "1";
            await _workoutPlanService.DeleteWorkoutPlanDayAsync(userId, 1);

            var deletedEntity = await _context.WorkoutPlanDays.FindAsync(1);
            Assert.IsNull(deletedEntity);
            var dbCount = await _context.Exercises.CountAsync();
            Assert.AreEqual(1, dbCount);
        }

        [TestMethod]
        public async Task DeleteWorkoutPlanDayAsync_ShouldThrowBadRequest_WhenUserIsNotOwner()
        {
            var userId = "1";
            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.DeleteWorkoutPlanDayAsync(userId, 2));
        }

        [TestMethod]
        public async Task DeleteWorkoutPlanDayAsync_ShouldThrowBadRequest_WhenPlanDayDoesntExist()
        {
            var userId = "1";
            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _workoutPlanService.DeleteWorkoutPlanDayAsync(userId, 3));
        }
    }
}
