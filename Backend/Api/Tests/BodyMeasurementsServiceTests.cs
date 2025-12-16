using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.BodyMeasurementRequests;
using Api.Models.Responses.BodyMeasurementResponses;
using Api.Services.Impl;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NSubstitute;

namespace Api.Tests
{
    [TestClass]
    public class BodyMeasurementsServiceTests
    {
        private IBodyMeasurementsService _bodyMeasurementsService;
        private AppDbContext _context;
        private IMapper _mapperMock;

        [TestInitialize]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            var bodyMeasurements = new List<BodyMeasurements>
            {
                new BodyMeasurements { Id = 1, BodyFatPercent = 10, HeightCm = 180, WeightKg = 80, UserId = "1" },
                new BodyMeasurements { Id = 2, BodyFatPercent = 15, HeightCm = 185, WeightKg = 95, UserId = "2" }
            };
            _context.BodyMeasurements.AddRange(bodyMeasurements);
            _context.SaveChanges();

            _mapperMock = Substitute.For<IMapper>();
            _bodyMeasurementsService = new BodyMeasurementsService(_context, _mapperMock);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        [TestMethod]
        public async Task CreateBodyMeasurementAsync_ShouldAddBodyMeasurementsToDatabase_WhenValidRequest()
        {
            var userId = "3";
            var request = new CreateBodyMeasurementsRequest { BodyFatPercent = 20, HeightCm = 190, WeightKg = 120 };
            var bodyMeasurementsEntity = new BodyMeasurements { BodyFatPercent = 20, HeightCm = 190, WeightKg = 120 };
            var response = new BodyMeasurementsResponse { Id = 3, BodyFatPercent = 20, HeightCm = 190, WeightKg = 120 };

            _mapperMock.Map<BodyMeasurements>(request).Returns(bodyMeasurementsEntity);
            _mapperMock.Map<BodyMeasurementsResponse>(bodyMeasurementsEntity).Returns(response);

            var result = await _bodyMeasurementsService.CreateBodyMeasurementAsync(userId, request);

            Assert.IsNotNull(result);
            Assert.AreEqual(20, result.BodyFatPercent);
            Assert.AreEqual(190, result.HeightCm);
            Assert.AreEqual(120, result.WeightKg);
            var dbCount = await _context.BodyMeasurements.CountAsync();
            Assert.AreEqual(3, dbCount);
        }

        [TestMethod]
        public async Task GetUserBodyMeasurementsAsync_ShouldReturnMappedBM_WhenBMExist()
        {
            var userId = "1";
            var response =  new BodyMeasurementsResponse { Id = 1, BodyFatPercent = 10, HeightCm = 180, WeightKg = 80 };

            _mapperMock.Map<BodyMeasurementsResponse>(Arg.Is<BodyMeasurements>(x => x.UserId == userId))
                .Returns(response);

            var result = await _bodyMeasurementsService.GetUserBodyMeasurementsAsync(userId);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
            Assert.AreEqual(10, result.BodyFatPercent);
            Assert.AreEqual(180, result.HeightCm);
            Assert.AreEqual(80, result.WeightKg);
        }

        [TestMethod]
        public async Task UpdateBodyMeasurementsAsync_ShouldUpdate_WhenIdAndUserMatch()
        {
            var userId = "1";
            var request = new UpdateBodyMeasurementsRequest { BodyMeasurementsId = 1, WeightKg = 82 };
            var response = new BodyMeasurementsResponse { Id = 1, BodyFatPercent = 10, HeightCm = 180, WeightKg = 82 };

            _mapperMock.When(x => x.Map(request, Arg.Any<BodyMeasurements>()))
                       .Do(callInfo =>
                       {
                           var dest = callInfo.Arg<BodyMeasurements>();
                           dest.WeightKg = request.WeightKg.Value;
                       });

            _mapperMock.Map<BodyMeasurementsResponse>(Arg.Any<BodyMeasurements>()).Returns(response);


            var result = await _bodyMeasurementsService.UpdateBodyMeasurementsAsync(userId, request);

            Assert.AreEqual(82, result.WeightKg);
            var updatedEntity = await _context.BodyMeasurements.FindAsync(1);
            Assert.AreEqual(82, updatedEntity.WeightKg);
        }

        [TestMethod]
        public async Task UpdateBodyMeasurementsAsync_ShouldThrowBadRequest_WhenIdDoesNotBelongToUser()
        {
            var userId = "1";
            var request = new UpdateBodyMeasurementsRequest { BodyMeasurementsId = 2, WeightKg = 82 };

            await Assert.ThrowsAsync<BadRequestException>(async () => 
                await _bodyMeasurementsService.UpdateBodyMeasurementsAsync(userId, request));
        }

        [TestMethod]
        public async Task DeleteBodyMeasurementsAsync_ShouldRemove_WhenIdAndUserMatch()
        {
            var userId = "1";

            await _bodyMeasurementsService.DeleteBodyMeasurementsAsync(userId, 1);

            var deletedEntity = await _context.BodyMeasurements.FindAsync(1);
            Assert.IsNull(deletedEntity);
            var dbCount = await _context.BodyMeasurements.CountAsync();
            Assert.AreEqual(1, dbCount);
        }

        [TestMethod]
        public async Task DeleteBodyMeasurementsAsync_ShouldThrowBadRequest_WhenMeasurementNotFound()
        {
            var userId = "1";

            await Assert.ThrowsAsync<BadRequestException>(async () =>
                await _bodyMeasurementsService.DeleteBodyMeasurementsAsync(userId, 3));
        }

    }
}
