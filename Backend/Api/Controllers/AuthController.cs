using Api.Database;
using Api.Models.Entities;
using Api.Models.Requests.AuthRequests;
using Api.Models.Responses.AuthResponses;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto registerRequest)
        {
            var result = await _authService.RegisterAsync(registerRequest);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto loginRequest)
        {
            var result = await _authService.LoginAsync(loginRequest);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("refresh")]
        public async Task<ActionResult<AuthResponseDto>> Refresh([FromBody] string refreshToken)
        {
            var result = await _authService.RefreshAsync(refreshToken);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult> Logout([FromBody] string refreshToken)
        {
            await _authService.LogoutAsync(refreshToken);
            return Ok(new { message = "Logged out from this session" });
        }
    }
}
