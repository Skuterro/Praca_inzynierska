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
    public class BodyMeasurementService : IBodyMeasurementService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public BodyMeasurementService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BodyMeasurementResponseDto>> GetUserBodyMeasurementsAsync(string userId)
        {
            var bodyMeasEntities = await _context.BodyMeasurements
                .Where(bm => bm.UserId == userId)
                .ToListAsync();

            return _mapper.Map<List<BodyMeasurementResponseDto>>(bodyMeasEntities);
        }

        public async Task<BodyMeasurementResponseDto> GetBodyMeasurementByIdAsync(int id)
        {
            var bodyMeasEntity =  await _context.BodyMeasurements.FindAsync(id);

            if (bodyMeasEntity == null)
            {
                throw new NotFoundException("Body Measurement does not exist");
            }

            return _mapper.Map<BodyMeasurementResponseDto>(bodyMeasEntity);
        }

        public async Task<BodyMeasurementResponseDto> CreateBodyMeasurementAsync(string userId, BodyMeasurementCreateDto bodyMeasurementCreateDto)
        {
            var bodyMeasEntity = _mapper.Map<BodyMeasurement>(bodyMeasurementCreateDto);
            bodyMeasEntity.UserId = userId;
            bodyMeasEntity.MeasurementDate = DateTime.UtcNow;

            _context.BodyMeasurements.Add(bodyMeasEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<BodyMeasurementResponseDto>(bodyMeasEntity);
        }

        public async Task DeleteBodyMeasurementAsync(string userId, int id)
        {
            var bodyMeasToDelete = await _context.BodyMeasurements.FirstOrDefaultAsync(bm => bm.Id == id);
        
            if(bodyMeasToDelete == null)
            {
                throw new NotFoundException("Body measurement does not exist");
            }

            if(bodyMeasToDelete.UserId != userId)
            {
                throw new UnauthorizedException("");
            }

            _context.BodyMeasurements.Remove(bodyMeasToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
