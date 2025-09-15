
using System.Security.Claims;
using Api.Models.Entities;
using Api.Models.Requests.BodyMeasurementRequests;
using Api.Models.Responses.BodyMeasurementResponses;
using Api.Services.Impl;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("body-measurements")]
    [Authorize]
    public class BodyMeasurementController : ControllerBase
    {
        private readonly IBodyMeasurementService _bodyMeasurementService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BodyMeasurementController(IBodyMeasurementService bodyMeasurementService, IHttpContextAccessor httpContextAccessor)
        {
            _bodyMeasurementService = bodyMeasurementService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<ActionResult<List<BodyMeasurementResponseDto>>> GetUserBodyMeasurements()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var bodyMeasurements = await _bodyMeasurementService.GetUserBodyMeasurementsAsync(userId);
            return Ok(bodyMeasurements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BodyMeasurementResponseDto>> GetBodyMeasurementById([FromRoute] int id)
        {
            var bodyMeasurement = await _bodyMeasurementService.GetBodyMeasurementByIdAsync(id);
            return Ok(bodyMeasurement);
        }

        [HttpPost]
        public async Task<ActionResult<BodyMeasurementResponseDto>> CreateExercise([FromBody] BodyMeasurementCreateDto bodyMeasurementCreateDto)
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

            var createdBodyMeasurement = await _bodyMeasurementService.CreateBodyMeasurementAsync(userId, bodyMeasurementCreateDto);
            return CreatedAtAction(nameof(GetBodyMeasurementById), new { id = createdBodyMeasurement.Id }, createdBodyMeasurement);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBodyMeasurement([FromRoute] int id)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            await _bodyMeasurementService.DeleteBodyMeasurementAsync(userId, id);
            return NoContent();
        }
    }
}
