using System.Security.Claims;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Responses.WorkoutPlanResponses;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("workout-plans")]
    [Authorize]
    public class WorkoutPlanController : ControllerBase
    {
        private readonly IWorkoutPlanService _workoutPlanService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public WorkoutPlanController(IWorkoutPlanService workoutPlanService, IHttpContextAccessor httpContextAccessor)
        {
            _workoutPlanService = workoutPlanService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        public async Task<ActionResult> CreateWorkoutPlan([FromBody] WorkoutPlanCreateDto workoutPlanCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var workoutPlan = await _workoutPlanService.CreateWorkoutPlanAsync(userId, workoutPlanCreateDto);
            return Ok(workoutPlan);
        }

        [HttpGet]
        public async Task<ActionResult<List<WorkoutPlanResponseDto>>> GetUserWorkoutPlans()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var workoutPlans = await _workoutPlanService.GetUserWorkoutPlansAsync(userId);
            return Ok(workoutPlans);
        }
    }
}
