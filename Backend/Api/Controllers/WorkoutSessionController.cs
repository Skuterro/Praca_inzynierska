using System.Security.Claims;
using Api.Database;
using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.ActiveSessionResponses;
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

        /*[HttpGet("{id}")]
        public async Task<ActionResult<WorkoutSessionResponseDto>> GetWorkoutSessionById([FromRoute] int id)
        {
            var workoutSession = await _workoutSessionService.GetWorkoutSessionByIdAsync(id);
            return Ok(workoutSession);
        }*/

        /*[HttpGet("set/{id}")]
        public async Task<ActionResult<WorkoutSessionSetResponseDto>> GetWorkoutSessionSetById([FromRoute] int id)
        {
            var workoutSessionSet = await _workoutSessionService.GetWorkoutSessionSetByIdAsync(id);
            return Ok(workoutSessionSet);
        }*/

        [HttpGet]
        public async Task<ActionResult<List<WorkoutSessionResponse>>> GetAllUserWorkoutSessions()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var workoutSessions = await _workoutSessionService.GetAllUserWorkoutSessionsAsync(userId);
            return Ok(workoutSessions);
        }

        [HttpPost("start")]
        public async Task<ActionResult<StartWorkoutSessionResponse>> StartWorkoutSession([FromBody] StartWorkoutSessionRequest request)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var workoutSessionResponse = await _workoutSessionService.StartWorkoutSessionAsync(userId, request);
            return Ok(workoutSessionResponse);
        }

        [HttpPost("add-set")]
        public async Task<ActionResult<WorkoutSessionSetResponse>> AddSetToWorkoutSession([FromBody] AddWorkouSessionSetRequest request)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var createdWorkoutSessionSet = await _workoutSessionService.AddSetAsync(userId, request);
            return Ok(createdWorkoutSessionSet);
        }

        [HttpPost("finish")]
        public async Task<ActionResult> FinishWorkoutSession([FromBody] FinishWorkoutSessionRequest request)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            await _workoutSessionService.FinishWorkoutSessionAsync(userId, request);
            return Ok();
        }

        [HttpGet("today-status")]
        public async Task<ActionResult<SessionStatusResponse>> GetTodayWorkoutStatus()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var response = await _workoutSessionService.GetTodaySessionStatusAsync(userId);
            return Ok(response);
        }


        [HttpGet("{sessionId}")]
        public async Task<ActionResult<WorkoutSessionDetailsResponse>> GetWorkoutSessionDetails([FromRoute] int sessionId)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var response = await _workoutSessionService.GetWorkoutSessionDetailsByIdAsync(userId, sessionId);
            return Ok(response);
        }
    }
}
