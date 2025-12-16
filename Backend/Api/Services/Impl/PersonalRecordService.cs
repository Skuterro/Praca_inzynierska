using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.OneRepMaxRequests;
using Api.Models.Requests.QueryParams;
using Api.Models.Responses.OneRepMaxResponses;
using Api.Models.Responses.PagedResult;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Impl
{
    public class PersonalRecordService : IPersonalRecordService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PersonalRecordService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PersonalRecordResponse> CreatePersonalRecordAsync(string userId, PersonalRecordRequest request)
        {
            var personalRecord = _mapper.Map<PersonalRecord>(request);
            personalRecord.UserId = userId;
            personalRecord.Date = DateTime.UtcNow;

            _context.PersonalRecords.Add(personalRecord);
            await _context.SaveChangesAsync();
            return _mapper.Map<PersonalRecordResponse>(personalRecord);
        }

        public async Task<IEnumerable<PersonalRecordResponse>> GetCurrentUserRecordsAsync(string userId)
        {
            var personalRecords = await _context.PersonalRecords
                .Where(orm => orm.UserId == userId)
                .GroupBy(orm => orm.Exercise)
                .Select(g => g.OrderByDescending(orm => orm.Date).First())
                .ToListAsync();

            return _mapper.Map<List<PersonalRecordResponse>>(personalRecords);
        }


        public async Task<PagedResult<PersonalRecordResponse>> GetAllRecordsOfExerciseAsync(string userId, int exerciseEnum, QueryParams queryParams)
        {
            var baseQuery = _context.PersonalRecords
                .Where (orm => orm.UserId == userId && orm.Exercise == (PersonalRecordExerciseEnum)exerciseEnum)
                .OrderByDescending(orm => orm.Date)
                .AsQueryable();

            var totalItemsCount = await baseQuery.CountAsync();

            var personalRecords = await baseQuery
                .Skip(queryParams.PageSize * (queryParams.PageNumber - 1))
                .Take(queryParams.PageSize)
                .ToListAsync();

            var response = _mapper.Map<List<PersonalRecordResponse>>(personalRecords);

            return new PagedResult<PersonalRecordResponse>(response, totalItemsCount, queryParams.PageNumber, queryParams.PageSize);
        }

        public async Task DeletePersonalRecordAsync(string userId, int id)
        {
            var recordToDelete = await _context.PersonalRecords.FirstOrDefaultAsync(orm => orm.Id == id && orm.UserId == userId);
            if(recordToDelete == null)
            {
                throw new BadRequestException("One rep max does not exist");
            }

            _context.PersonalRecords.Remove(recordToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
