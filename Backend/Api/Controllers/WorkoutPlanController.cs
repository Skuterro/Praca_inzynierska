using System.Security.Claims;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Services.Interfaces;
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
            Console.WriteLine("CHUJ");
            foreach (var claim in _httpContextAccessor.HttpContext!.User.Claims)
            {
                Console.WriteLine($"{claim.Type} = {claim.Value}");
            }

            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var plan = await _workoutPlanService.CreateWorkoutPlanAsync(userId, workoutPlanCreateDto);
            return Ok(plan);
        }
    }
}
