using System.Security.Claims;
using Api.Models.Requests.OneRepMaxRequests;
using Api.Models.Requests.QueryParams;
using Api.Models.Responses.OneRepMaxResponses;
using Api.Models.Responses.PagedResult;
using Api.Services.Impl;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("personal-records")]
    [Authorize]
    public class PersonalRecordController : ControllerBase
    {
        private readonly IPersonalRecordService _personalRecordService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PersonalRecordController(IPersonalRecordService personalRecordService, IHttpContextAccessor httpContextAccessor)
        {
            _personalRecordService = personalRecordService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<ActionResult<List<PersonalRecordResponse>>> GetCurrentUserRecords()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var personalRecords = await _personalRecordService.GetCurrentUserRecordsAsync(userId);
            return Ok(personalRecords);
        }

        [HttpGet("exercise/{exerciseEnum}")]
        public async Task<ActionResult<PagedResult<PersonalRecordResponse>>> GetAllRecordsOfExercise([FromRoute] int exerciseEnum, [FromQuery] QueryParams queryParams)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var response = await _personalRecordService.GetAllRecordsOfExerciseAsync(userId, exerciseEnum, queryParams);
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> CreatePersonalRecord([FromBody] PersonalRecordRequest request)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            await _personalRecordService.CreatePersonalRecordAsync(userId, request);
            return Created();
        }

        [HttpDelete("{recordId}")]
        public async Task<ActionResult> DeletePersonalRecord([FromRoute] int recordId)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            await _personalRecordService.DeletePersonalRecordAsync(userId, recordId);
            return NoContent();
        }
    }
}
