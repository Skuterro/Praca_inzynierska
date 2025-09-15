using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.OneRepMaxRequests;
using Api.Models.Responses.OneRepMaxResponses;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Impl
{
    public class OneRepMaxService : IOneRepMaxService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OneRepMaxService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OneRepMaxResponseDto>> GetLatestOneRepMaxesAsync(string userId)
        {
            var oneRepMaxEntities = await _context.OneRepMaxes
                .Where(orm => orm.UserId == userId)
                .Include(orm => orm.Exercise)
                .GroupBy(orm => orm.ExerciseId)
                .Select(g => g.OrderByDescending(orm => orm.Date).First())
                .ToListAsync();

            return _mapper.Map<List<OneRepMaxResponseDto>>(oneRepMaxEntities);
        }

        public async Task<IEnumerable<OneRepMaxResponseDto>> GetAllOneRepMaxesOfExerciseAsync(string userId, int exerciseId)
        {
            var exerciseExist = await _context.Exercises.AnyAsync(e => e.Id == exerciseId);
            if (!exerciseExist)
            {
                throw new BadRequestException("Exercise does not exist");
            }

            var oneRepMaxEntities = await _context.OneRepMaxes
                .Where(orm => orm.UserId == userId && orm.ExerciseId == exerciseId)
                .OrderByDescending(orm => orm.Date)
                .ToListAsync();

            return _mapper.Map<List<OneRepMaxResponseDto>>(oneRepMaxEntities);
        }

        public async Task<OneRepMaxResponseDto> GetOneRepMaxByIdAsync(int id)
        {
            var oneRepMaxEntity = await _context.OneRepMaxes.Include(orm => orm.Exercise).FirstOrDefaultAsync(orm => orm.Id == id);
            if (oneRepMaxEntity == null)
            {
                throw new NotFoundException("One rep max does not exist");
            }

            return _mapper.Map<OneRepMaxResponseDto>(oneRepMaxEntity);
        }

        public async Task<OneRepMaxResponseDto> CreateOneRepMaxAsync(string userId, OneRepMaxCreateDto oneRepMaxCreateDto)
        {
            var oneRepMaxEntity = _mapper.Map<OneRepMax>(oneRepMaxCreateDto);
            oneRepMaxEntity.UserId = userId;
            oneRepMaxEntity.Date = DateTime.UtcNow;

            _context.Add(oneRepMaxEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<OneRepMaxResponseDto>(oneRepMaxEntity);
        }

        public async Task DeleteOneRepMaxAsync(string userId, int id)
        {
            var oneRepMaxToDelete = await _context.OneRepMaxes.FirstOrDefaultAsync(orm => orm.Id == id);
            if(oneRepMaxToDelete == null)
            {
                throw new NotFoundException("One rep max does not exist");
            }

            if(oneRepMaxToDelete.UserId != userId)
            {
                throw new UnauthorizedException("");
            }

            _context.Remove(oneRepMaxToDelete);
            await _context.SaveChangesAsync();
        }

    }
}
