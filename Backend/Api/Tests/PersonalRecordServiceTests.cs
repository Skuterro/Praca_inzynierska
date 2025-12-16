using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.OneRepMaxRequests;
using Api.Models.Requests.QueryParams;
using Api.Models.Responses.OneRepMaxResponses;
using Api.Services.Impl;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NSubstitute;

namespace Api.Tests
{
    [TestClass]
    public class PersonalRecordServiceTests
    {
        private IPersonalRecordService _personalRecordService;
        private AppDbContext _context;
        private IMapper _mapperMock;

        [TestInitialize]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            var personalRecords = new List<PersonalRecord>
            {
                new PersonalRecord { Id = 1, UserId = "1", Exercise = PersonalRecordExerciseEnum.BenchPress, WeightKg = 90, Date = DateTime.UtcNow.AddDays(-2) },
                new PersonalRecord { Id = 2, UserId = "1", Exercise = PersonalRecordExerciseEnum.BenchPress, WeightKg = 105, Date = DateTime.UtcNow.AddDays(-1) },
                new PersonalRecord { Id = 3, UserId = "1", Exercise = PersonalRecordExerciseEnum.Squat, WeightKg = 120, Date = DateTime.UtcNow.AddDays(-1) },
                new PersonalRecord { Id = 4, UserId = "2", Exercise = PersonalRecordExerciseEnum.Squat, WeightKg = 110, Date = DateTime.UtcNow.AddDays(-3) }
            };
            _context.PersonalRecords.AddRange(personalRecords);
            _context.SaveChanges();

            _mapperMock = Substitute.For<IMapper>();
            _personalRecordService = new PersonalRecordService(_context, _mapperMock);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        [TestMethod]
        public async Task CreatePersonalRecordAsync_ShouldAddPersonalRecordToDatabase_WhenValidRequest()
        {
            var userId = "1";
            var request = new PersonalRecordRequest { Exercise = PersonalRecordExerciseEnum.BenchPress, WeightKg = 120 };
            var personalRecordEntity = new PersonalRecord { Exercise = PersonalRecordExerciseEnum.BenchPress, WeightKg = 120 };
            var response = new PersonalRecordResponse { Id = 5, Exercise = PersonalRecordExerciseEnum.BenchPress, WeightKg = 120, Date = DateTime.UtcNow };

            _mapperMock.Map<PersonalRecord>(request).Returns(personalRecordEntity);
            _mapperMock.Map<PersonalRecordResponse>(Arg.Any<PersonalRecord>()).Returns(response);

            var result = await _personalRecordService.CreatePersonalRecordAsync(userId, request);

            Assert.IsNotNull(result);
            Assert.AreEqual(5, response.Id);
            Assert.AreEqual(120, response.WeightKg);
            var dbCount = await _context.PersonalRecords.CountAsync();
            Assert.AreEqual(5, dbCount);
        }

        [TestMethod]
        public async Task GetCurrentUserRecordsAsync_ShouldReturnOnlyLatestRecordForEachExercise_WhenPRsExist()
        {
            var userId = "1";
            var response = new List<PersonalRecordResponse>
            {
                new PersonalRecordResponse { Id = 1, Exercise = PersonalRecordExerciseEnum.BenchPress, WeightKg = 105 },
                new PersonalRecordResponse { Id = 2, Exercise = PersonalRecordExerciseEnum.Squat, WeightKg = 120 },
            };

            _mapperMock.Map<List<PersonalRecordResponse>>(Arg.Any<List<PersonalRecord>>())
                .Returns(response);

            var result = await _personalRecordService.GetCurrentUserRecordsAsync(userId);

            Assert.AreEqual(2, result.Count());
        }

        [TestMethod]
        public async Task GetAllRecordsOfExerciseAsync_ShouldReturnCorrectPageAndTotalCount_WhenPRsExist()
        {
            var userId = "1";
            var exercise = (int)PersonalRecordExerciseEnum.Squat;
            var query = new QueryParams { PageNumber = 1 }; 

            var recordId2Response = new PersonalRecordResponse { Id = 3, WeightKg = 120 };

            _mapperMock.Map<List<PersonalRecordResponse>>(Arg.Any<List<PersonalRecord>>())
                       .Returns(new List<PersonalRecordResponse> { recordId2Response });

            var result = await _personalRecordService.GetAllRecordsOfExerciseAsync(userId, exercise, query);

            Assert.AreEqual(1, result.Items.Count());
            Assert.AreEqual(120, result.Items.First().WeightKg);
        }

        [TestMethod]
        public async Task DeletePersonalRecordAsync_ShouldRemoveRecord_WhenIdAndUserMatch()
        {
            var userId = "1";
            await _personalRecordService.DeletePersonalRecordAsync(userId, 1);


            var deletedEntity = await _context.PersonalRecords.FindAsync(1);
            Assert.IsNull(deletedEntity);
            var dbCount = await _context.PersonalRecords.CountAsync();
            Assert.AreEqual(3, dbCount);
        }

        [TestMethod]
        public async Task DeletePersonalRecordAsync_ShouldThrowBadRequest_WhenIdBelongsToOtherUser()
        {
            var userId = "1";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _personalRecordService.DeletePersonalRecordAsync(userId, 4));
        }

        [TestMethod]
        public async Task DeletePersonalRecordAsync_ShouldThrowBadRequest_WhenPRDoesntExist()
        {
            var userId = "1";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _personalRecordService.DeletePersonalRecordAsync(userId, 5));
        }
    }
}
