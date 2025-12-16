using Api.Models.Entities;
using Api.Models.Requests.ExerciseRequests;
using Api.Models.Responses.ExerciseResponses;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("exercise")]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ExerciseResponse>>> GetAllExercises()
        {
            var exercises = await _exerciseService.GetAllExercisesAsync();
            return Ok(exercises);
        }

        [HttpGet("getByBodyPart/{bodyPart}")]
        public async Task<ActionResult<List<ExerciseResponse>>> GetExercisesByBodyPart([FromRoute] BodyPartEnum bodyPart)
        {
            if (!Enum.IsDefined(typeof(BodyPartEnum), bodyPart))
            {
                return BadRequest("Invalid body part");
            }

            var exercises = await _exerciseService.GetExercisesByBodyPartAsync(bodyPart);
            return Ok(exercises);
        }

        [HttpPost]
        public async Task<ActionResult> CreateExercise([FromBody] CreateExerciseRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _exerciseService.CreateExerciseAsync(request);
            return Created();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExercise([FromRoute] int id)
        {
            await _exerciseService.DeleteExerciseAsync(id);
            return NoContent();
        }
    }
}
