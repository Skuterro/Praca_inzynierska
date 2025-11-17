using Api.Models.Entities;
using Api.Models.Requests.ExerciseRequests;
using Api.Models.Responses.ExerciseResponses;

namespace Api.Services.Interfaces
{
    public interface IExerciseService
    {
        Task<IEnumerable<ExerciseResponseDto>> GetAllExercisesAsync();
        Task<ExerciseResponseDto> GetExerciseById(int id);
        Task<IEnumerable<ExerciseResponseDto>> GetExercisesByBodyPartAsync(BodyPartEnum bodyPart);
        Task<ExerciseResponseDto> CreateExercise(ExerciseCreateDto exericseDto);
        Task DeleteExerciseAsync(int id);
    }
}
