using Api.Models.Requests.WorkoutPlanRequests;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("workoutPlan")]
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

            var userId = _httpContextAccessor.HttpContext!.User.FindFirst("sub")?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var plan = await _workoutPlanService.CreateWorkoutPlanAsync(userId, workoutPlanCreateDto);
            return Ok(plan);
        }
    }
}
