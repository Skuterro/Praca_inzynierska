using System.Security.Claims;
using Api.Database;
using Api.Models.Requests.QueryParams;
using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.ActiveSessionResponses;
using Api.Models.Responses.PagedResult;
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

        [HttpGet]
        public async Task<ActionResult<PagedResult<WorkoutSessionResponse>>> GetAllUserWorkoutSessions([FromQuery] QueryParams queryParams)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var response = await _workoutSessionService.GetAllUserWorkoutSessionsAsync(userId, queryParams);
            return Ok(response);
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
