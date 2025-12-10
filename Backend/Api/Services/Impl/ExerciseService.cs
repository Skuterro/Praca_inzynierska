using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.ExerciseRequests;
using Api.Models.Responses.ExerciseResponses;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Impl
{
    public class ExerciseService : IExerciseService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ExerciseService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ExerciseResponse>> GetAllExercisesAsync()
        {
            var exerciseEntities = await _context.Exercises.ToListAsync();
            return _mapper.Map<List<ExerciseResponse>>(exerciseEntities);
        }

        public async Task<IEnumerable<ExerciseResponse>> GetExercisesByBodyPartAsync(BodyPartEnum bodyPart)
        {
            var exercisesEntites = await _context.Exercises
                .Where(e => e.BodyPart == bodyPart)
                .ToListAsync();

            return _mapper.Map<List<ExerciseResponse>>(exercisesEntites);
        }

        public async Task<ExerciseResponse> CreateExercise(CreateExerciseRequest request)
        {
            var exerciseEntity = _mapper.Map<Exercise>(request);
            _context.Exercises.Add(exerciseEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<ExerciseResponse>(exerciseEntity);
        }

        public async Task DeleteExerciseAsync(int id)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(e => e.Id == id);
            if (exercise == null)
            {
                throw new NotFoundException("Exercise does not exist");
            }

            await _context.SaveChangesAsync();
        }
    }
}
