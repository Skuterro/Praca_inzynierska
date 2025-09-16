using System.Security.Claims;
using Api.Database;
using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.WorkoutSessionResponses;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("workout-sessions")]
    public class WorkoutSessionController : ControllerBase
    {
        private readonly IWorkoutSessionService _workoutSessionService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public WorkoutSessionController(IWorkoutSessionService workoutSessionService, IHttpContextAccessor httpContextAccessor)
        {
            _workoutSessionService = workoutSessionService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutSessionResponseDto>> GetWorkoutSessionById([FromRoute] int id)
        {
            var workoutSession = await _workoutSessionService.GetWorkoutSessionByIdAsync(id);
            return Ok(workoutSession);
        }

        [HttpGet("set/{id}")]
        public async Task<ActionResult<WorkoutSessionSetResponseDto>> GetWorkoutSessionSetById([FromRoute] int id)
        {
            var workoutSessionSet = await _workoutSessionService.GetWorkoutSessionSetByIdAsync(id);
            return Ok(workoutSessionSet);
        }

        [HttpGet]
        public async Task<ActionResult<List<WorkoutSessionResponseDto>>> GetAllUserWorkoutSessions()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var workoutSessions = await _workoutSessionService.GetAllUserWorkoutSessionsAsync(userId);
            return Ok(workoutSessions);
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutSessionResponseDto>> StartWorkoutSession([FromBody] WorkoutSessionCreateDto workoutSessionCreateDto)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var createdWorkoutSession = await _workoutSessionService.CreateWorkoutSessionAsync(userId, workoutSessionCreateDto);
            return CreatedAtAction(nameof(GetWorkoutSessionById), new { id = createdWorkoutSession.Id }, createdWorkoutSession);
        }

        [HttpPost("add-set")]
        public async Task<ActionResult<WorkoutSessionSetResponseDto>> AddSetToWorkoutSession([FromBody] WorkoutSessionSetCreateDto workoutSessionSetCreateDto)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var createdWorkoutSessionSet = await _workoutSessionService.CreateWorkoutSessionSetAsync(workoutSessionSetCreateDto);
            return CreatedAtAction(nameof(GetWorkoutSessionSetById), new { id = createdWorkoutSessionSet.Id }, createdWorkoutSessionSet);
        }
    }
}
