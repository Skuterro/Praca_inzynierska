using System.Linq;
using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.ExerciseRequests;
using Api.Models.Responses.ExerciseResponses;
using Api.Services.Impl;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NSubstitute;

namespace Api.Tests
{
    [TestClass]
    public class ExerciseServiceTests
    {
        private IExerciseService _exerciseService;
        private AppDbContext _context;
        private IMapper _mapperMock;

        [TestInitialize]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            var exercises = new List<Exercise>
            {
                new Exercise { Id = 1, Name = "Bench Press", BodyPart = BodyPartEnum.Chest },
                new Exercise { Id = 2, Name = "Dead Lift", BodyPart = BodyPartEnum.Legs },
                new Exercise { Id = 3, Name = "Squat", BodyPart = BodyPartEnum.Legs }
            };
            _context.Exercises.AddRange(exercises);
            _context.SaveChanges();

            _mapperMock = Substitute.For<IMapper>();
            _exerciseService = new ExerciseService(_context, _mapperMock);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        [TestMethod]
        public async Task GetAllExercisesAsync_ShouldReturnMappedExercises_WhenExercisesExist()
        {
            var response = new List<ExerciseResponse>
            {
                new ExerciseResponse { Id = 1, Name = "Bench Press", BodyPart = "Chest" },
                new ExerciseResponse { Id = 2, Name = "Dead Lift", BodyPart = "Legs"},
                new ExerciseResponse { Id = 3, Name = "Squat", BodyPart = "Legs" }
            };

            _mapperMock.Map<List<ExerciseResponse>>(Arg.Any<List<Exercise>>())
                .Returns(response);

            var result = await _exerciseService.GetAllExercisesAsync();

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Count());
            _mapperMock.Received(1).Map<List<ExerciseResponse>>(Arg.Is<List<Exercise>>(x => x.Count == 3));
        }

        [TestMethod]
        public async Task GetExercisesByBodyPartAsync_ShouldReturnFilteredExercises_WhenExercisesExist()
        {
            var response = new List<ExerciseResponse>
            {
                new ExerciseResponse { Id = 2, Name = "RDL", BodyPart = "Legs" },
                new ExerciseResponse { Id = 3, Name = "Squat", BodyPart = "Legs" }
            };

            _mapperMock.Map<List<ExerciseResponse>>(Arg.Any<List<Exercise>>())
                .Returns(response);

            var result = await _exerciseService.GetExercisesByBodyPartAsync(BodyPartEnum.Legs);

            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
            _mapperMock.Received(1).Map<List<ExerciseResponse>>(Arg.Is<List<Exercise>>(x => x.Count == 2 && x.All(e => e.BodyPart == BodyPartEnum.Legs)));
        }

        [TestMethod]
        public async Task CreateExerciseAsync_ShouldAddExerciseToDatabase_WhenValidRequest()
        {
            var request = new CreateExerciseRequest { Name = "Dumbell Bench Press", BodyPart = "Chest" };
            var exerciseEntity = new Exercise { Name = "Dumbell Bench Press", BodyPart = BodyPartEnum.Chest };
            var response = new ExerciseResponse { Id = 4, Name = "Dumbell Bench Press", BodyPart = "Chest" };

            _mapperMock.Map<Exercise>(request).Returns(exerciseEntity);
            _mapperMock.Map<ExerciseResponse>(exerciseEntity).Returns(response);
            
            var result = await _exerciseService.CreateExerciseAsync(request);

            Assert.IsNotNull(result);
            Assert.AreEqual("Dumbell Bench Press", result.Name);
            Assert.AreEqual("Chest", result.BodyPart);
            var dbCount = await _context.Exercises.CountAsync();
            Assert.AreEqual(4, dbCount);
        }

        [TestMethod]
        public async Task DeleteExerciseAsync_ShouldDeleteExercise_WhenExerciseExists()
        {
            await _exerciseService.DeleteExerciseAsync(1);

            var deletedEntity = await _context.BodyMeasurements.FindAsync(1);
            Assert.IsNull(deletedEntity);
            var dbCount = await _context.Exercises.CountAsync();
            Assert.AreEqual(2, dbCount);
        }

        [TestMethod]
        public async Task DeleteExerciseAsync_ShouldThrowBadRequest_WhenExerciseDoesNotExist()
        {
            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _exerciseService.DeleteExerciseAsync(5));
        }
    }
}
