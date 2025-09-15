using System.Security.Claims;
using Api.Models.Requests.OneRepMaxRequests;
using Api.Models.Responses.OneRepMaxResponses;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("one-rep-maxes")]
    [Authorize]
    public class OneRepMaxController : ControllerBase
    {
        private readonly IOneRepMaxService _oneRepMaxService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public OneRepMaxController(IOneRepMaxService oneRepMaxService, IHttpContextAccessor httpContextAccessor)
        {
            _oneRepMaxService = oneRepMaxService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<ActionResult<List<OneRepMaxResponseDto>>> GetUserLatestOneRepMaxes()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var oneRepMaxes = await _oneRepMaxService.GetLatestOneRepMaxesAsync(userId);
            return Ok(oneRepMaxes);
        }

        [HttpGet("exercise/{exerciseId}")]
        public async Task<ActionResult<List<OneRepMaxResponseDto>>> GetAllOneRepMaxesOfExercise([FromRoute] int exerciseId)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var oneRepMaxes = await _oneRepMaxService.GetAllOneRepMaxesOfExerciseAsync(userId, exerciseId);
            return Ok(oneRepMaxes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OneRepMaxResponseDto>> GetOneRepMaxById([FromRoute] int id)
        {
            var oneRepMax = await _oneRepMaxService.GetOneRepMaxByIdAsync(id);
            return Ok(oneRepMax);
        }

        [HttpPost]
        public async Task<ActionResult<OneRepMaxResponseDto>> CreateOneRepMax([FromBody] OneRepMaxCreateDto oneRepMaxCreateDto)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var createdOneRepMax = await _oneRepMaxService.CreateOneRepMaxAsync(userId, oneRepMaxCreateDto);
            return CreatedAtAction(nameof(GetOneRepMaxById), new { id = createdOneRepMax.Id }, createdOneRepMax);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOneRepMax([FromRoute] int id)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            await _oneRepMaxService.DeleteOneRepMaxAsync(userId, id);
            return NoContent();
        }
    }
}
