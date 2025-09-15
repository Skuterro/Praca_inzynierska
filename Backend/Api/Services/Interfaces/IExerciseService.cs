using Api.Models.Requests.ExerciseRequests;
using Api.Models.Responses.ExerciseResponses;

namespace Api.Services.Interfaces
{
    public interface IExerciseService
    {
        Task<IEnumerable<ExerciseResponseDto>> GettAllExercisesAsync();
        Task<ExerciseResponseDto> GetExerciseById(int id);
        Task<ExerciseResponseDto> CreateExercise(ExerciseCreateDto exericseDto);
        Task DeleteExerciseAsync(int id);
    }
}
