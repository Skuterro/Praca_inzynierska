using Api.Models.Requests.ExerciseRequests;
using Api.Models.Responses.ExerciseResponses;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("exercises")]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ExerciseResponseDto>>> GetAllExercises()
        {
            var exercises = await _exerciseService.GettAllExercisesAsync();
            return Ok(exercises);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExerciseResponseDto>> GetExerciseById([FromRoute] int id)
        {
            var exercise = await _exerciseService.GetExerciseById(id);
            return Ok(exercise);
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseResponseDto>> CreateExercise([FromBody] ExerciseCreateDto exerciseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdExercise = await _exerciseService.CreateExercise(exerciseDto);
            return CreatedAtAction(nameof(GetExerciseById), new { id = createdExercise.Id }, createdExercise);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExercise([FromRoute] int id)
        {
            await _exerciseService.DeleteExerciseAsync(id);
            return NoContent();
        }
    }
}
