
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
    public class BodyMeasurementsController : ControllerBase
    {
        private readonly IBodyMeasurementsService _bodyMeasurementService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BodyMeasurementsController(IBodyMeasurementsService bodyMeasurementService, IHttpContextAccessor httpContextAccessor)
        {
            _bodyMeasurementService = bodyMeasurementService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<ActionResult<BodyMeasurementsResponse>> GetUserBodyMeasurements()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var bodyMeasurements = await _bodyMeasurementService.GetUserBodyMeasurementsAsync(userId);
            return Ok(bodyMeasurements);
        }

        [HttpPost]
        public async Task<ActionResult> CreateBodyMeasurements([FromBody] CreateBodyMeasurementsRequest request)
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

            await _bodyMeasurementService.CreateBodyMeasurementAsync(userId, request);
            return Created();
        }

        [HttpPatch]
        public async Task<ActionResult<BodyMeasurementsResponse>> UpdateBodyMeasutements([FromBody] UpdateBodyMeasurementsRequest request)
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
            var updatedBodyMeasurements = await _bodyMeasurementService.UpdateBodyMeasurementsAsync(userId, request);
            return Ok(updatedBodyMeasurements);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteBodyMeasurement([FromRoute] int id)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            await _bodyMeasurementService.DeleteBodyMeasurementsAsync(userId, id);
            return NoContent();
        }
    }
}
