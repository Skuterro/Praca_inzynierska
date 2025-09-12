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

        public async Task<IEnumerable<ExerciseResponseDto>> GettAllExercisesAsync()
        {
            var exercises = await _context.Exercises.ToListAsync();
            return _mapper.Map<List<ExerciseResponseDto>>(exercises);
        }

        public async Task<ExerciseResponseDto> GetExerciseById(int id)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(e => e.Id ==  id);
            if (exercise == null) 
            {
                throw new NotFoundException("Exercise does not exist");
            }

            return _mapper.Map<ExerciseResponseDto>(exercise);
        }

        public async Task<ExerciseResponseDto> CreateExercise(ExerciseCreateDto exericseDto)
        {
            var exerciseEntity = _mapper.Map<Exercise>(exericseDto);
            _context.Exercises.Add(exerciseEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<ExerciseResponseDto>(exerciseEntity);
        }

        public async Task DeleteTaskAsync(int id)
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
