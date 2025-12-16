using Api.Models.Entities;
using Api.Models.Requests.ExerciseRequests;
using Api.Models.Responses.ExerciseResponses;

namespace Api.Services.Interfaces
{
    public interface IExerciseService
    {
        Task<IEnumerable<ExerciseResponse>> GetAllExercisesAsync();
        Task<IEnumerable<ExerciseResponse>> GetExercisesByBodyPartAsync(BodyPartEnum bodyPart);
        Task<ExerciseResponse> CreateExerciseAsync(CreateExerciseRequest request);
        Task DeleteExerciseAsync(int id);
    }
}
