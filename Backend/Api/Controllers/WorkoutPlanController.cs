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
        public async Task<ActionResult<List<WorkoutPlanResponseDto>>> GetUserWorkoutPlans()
        {
            var userId = HttpContext.GetUserId();
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

            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var createdWorkoutPlan = await _workoutPlanService.CreateEmptyWorkoutPlanAsync(userId, workoutPlanCreateDto);
            return CreatedAtAction(nameof(GetWorkouPlanById), new { id = createdWorkoutPlan.Id }, createdWorkoutPlan);
        }

        [HttpGet("{planId}/days")]
        public async Task<ActionResult<List<WorkoutPlanDayResponseDto>>> GetWorkoutPlanDays([FromRoute] int planId)
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
        public async Task<ActionResult<List<WorkoutPlanDayResponseDto>>> getWorkoutPlanByWeekDay([FromRoute] int weekDayIndex)
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
        public async Task<ActionResult> AddDay([FromBody] WorkoutPlanDayCreateDto dto)
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

            var day = await _workoutPlanService.AddDayToPlanAsync(userId, dto);
            return Ok(day);
        }

        [HttpPost("days/addExercise")]
        public async Task<ActionResult> AddExerciseToDay([FromBody] DayExerciseCreateDto dto)
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

            var res = await _workoutPlanService.AddExerciseToDayAsync(userId, dto);
            return Ok(res);
        }

        [HttpGet("days/{dayId}/exercises")]
        public async Task<ActionResult<List<DayExerciseResponseDto>>> GetWorkoutPlanDayExercises([FromRoute] int dayId)
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
    }
}
