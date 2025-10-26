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

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutPlanResponseDto>> GetWorkouPlanById(int id)
        {
            var workoutPlan = await _workoutPlanService.GetWorkoutPlanById(id);
            return Ok(workoutPlan);
        }

        [HttpPost]
        public async Task<ActionResult> CreateEmptyWorkoutPlan([FromBody] WorkoutPlanCreateDto workoutPlanCreateDto)
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

            var createdWorkoutPlan = await _workoutPlanService.CreateEmptyWorkoutPlanAsync(userId, workoutPlanCreateDto);
            return CreatedAtAction(nameof(GetWorkouPlanById), new { id = createdWorkoutPlan.Id }, createdWorkoutPlan);
        }

        [HttpPost("{planId}/days")]
        public async Task<IActionResult> AddDay([FromBody] WorkoutPlanDayCreateDto dto)
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

            var day = await _workoutPlanService.AddDayToPlanAsync(userId, dto);
            return Ok(day);
        }

        [HttpPost("days/{dayId}/exercises")]
        public async Task<IActionResult> AddExerciseToDay([FromBody] DayExerciseCreateDto dto)
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

            var res = await _workoutPlanService.AddExerciseToDayAsync(userId, dto);
            return Ok(res);
        }
    }
}
