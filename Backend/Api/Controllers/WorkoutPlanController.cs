using Api.Extensions;
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

        public WorkoutPlanController(IWorkoutPlanService workoutPlanService)
        {
            _workoutPlanService = workoutPlanService;
        }

        [HttpGet]
        public async Task<ActionResult<List<WorkoutPlanResponse>>> GetUserWorkoutPlans()
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var workoutPlans = await _workoutPlanService.GetUserWorkoutPlansAsync(userId);
            return Ok(workoutPlans);
        }


        [HttpPost]
        public async Task<ActionResult> CreateEmptyWorkoutPlan([FromBody] CreateWorkoutPlanRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            await _workoutPlanService.CreateEmptyWorkoutPlanAsync(userId, request);
            return Created();
        }

        [HttpGet("{planId}/days")]
        public async Task<ActionResult<List<SimpleWorkoutPlanDayResponse>>> GetWorkoutPlanDays([FromRoute] int planId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var days = await _workoutPlanService.GetWorkoutPlanDaysAsync(userId, planId);
            return Ok(days);
        }

        [HttpGet("weekDay/{weekDayIndex}")]
        public async Task<ActionResult<List<WorkoutPlanDayResponse>>> getWorkoutPlanByWeekDay([FromRoute] int weekDayIndex)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var todayWorkoutPlan = await _workoutPlanService.GetWorkoutPlanByWeekDayAsync(userId, weekDayIndex);
            return Ok(todayWorkoutPlan);
        }

        [HttpPost("addDay")]
        public async Task<ActionResult> AddDay([FromBody] CreateWorkoutPlanDayRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            await _workoutPlanService.AddDayToPlanAsync(userId, request);
            return Created();
        }

        [HttpPost("days/addExercise")]
        public async Task<ActionResult> AddExerciseToDay([FromBody] CreateDayExerciseRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            await _workoutPlanService.AddExerciseToDayAsync(userId, request);
            return Created();
        }

        [HttpGet("days/{dayId}/exercises")]
        public async Task<ActionResult<List<DayExerciseResponse>>> GetWorkoutPlanDayExercises([FromRoute] int dayId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var exercises = await _workoutPlanService.GetWorkoutPlanDayExercisesAsync(userId, dayId);
            return Ok(exercises);
        }

        [HttpPut("{planId}/toggle-active")]
        public async Task<ActionResult> ToggleActive([FromRoute] int planId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            await _workoutPlanService.ToggleWorkoutPlanAsync(userId, planId);
            return NoContent();
        }

        [HttpDelete("{planId}")]
        public async Task<ActionResult> DeleteWorkoutPlan([FromRoute] int planId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            await _workoutPlanService.DeleteWorkoutPlanAsync(userId, planId);
            return NoContent();
        }

        [HttpDelete("days/{planDayId}")]
        public async Task<ActionResult> DeleteWorkoutPlanDay([FromRoute] int planDayId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            await _workoutPlanService.DeleteWorkoutPlanDayAsync(userId, planDayId);
            return NoContent();
        }
    }
}
