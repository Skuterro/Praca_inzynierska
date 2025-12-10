using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.BodyMeasurementRequests;
using Api.Models.Responses.BodyMeasurementResponses;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Impl
{
    public class BodyMeasurementsService : IBodyMeasurementsService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public BodyMeasurementsService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BodyMeasurementsResponse> CreateBodyMeasurementAsync(string userId, CreateBodyMeasurementsRequest request)
        {
            var bodyMeasEntity = _mapper.Map<BodyMeasurements>(request);
            bodyMeasEntity.UserId = userId;

            _context.BodyMeasurements.Add(bodyMeasEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<BodyMeasurementsResponse>(bodyMeasEntity);
        }

        public async Task<BodyMeasurementsResponse> GetUserBodyMeasurementsAsync(string userId)
        {
            var bodyMeasEntities = await _context.BodyMeasurements
                .FirstOrDefaultAsync(bm => bm.UserId == userId);

            return _mapper.Map<BodyMeasurementsResponse>(bodyMeasEntities);
        }

        public async Task<BodyMeasurementsResponse> UpdateBodyMeasurementsAsync(string userId, UpdateBodyMeasurementsRequest request)
        {
            var bodyMeasToUpdate = await _context.BodyMeasurements
                .FirstOrDefaultAsync(bm => bm.Id == request.BodyMeasurementsId && bm.UserId == userId);

            if (bodyMeasToUpdate == null)
            {
                throw new BadRequestException("Body measurement does not exist");
            }

            _mapper.Map(request, bodyMeasToUpdate);
            await _context.SaveChangesAsync();
            return _mapper.Map<BodyMeasurementsResponse>(bodyMeasToUpdate);
        }

        public async Task DeleteBodyMeasurementsAsync(string userId, int id)
        {
            var bodyMeasToDelete = await _context.BodyMeasurements.FirstOrDefaultAsync(bm => bm.Id == id && bm.UserId == userId);
        
            if(bodyMeasToDelete == null)
            {
                throw new BadRequestException("Body measurement does not exist");
            }

            _context.BodyMeasurements.Remove(bodyMeasToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
