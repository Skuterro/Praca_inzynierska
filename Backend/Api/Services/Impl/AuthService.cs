using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.AuthRequests;
using Api.Models.Responses.AuthResponses;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Impl
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly AppDbContext _context;

        public AuthService(UserManager<User> userManager, ITokenService tokenService, AppDbContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                throw new BadRequestException("User with this email already exists");
            }

            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new BadRequestException($"User creation failed: {errors}");
            }

            return await GenerateTokensAsync(user);
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                throw new UnauthorizedException("Invalid email or password");
            }

            return await GenerateTokensAsync(user);
        }

        public async Task LogoutAsync(string refreshToken)
        {
            var storedToken = await _context.RefreshTokens.FirstOrDefaultAsync(r => r.Token == refreshToken);

            if (storedToken == null)
            {
                throw new NotFoundException("Refresh token not found");
            }

            storedToken.IsRevoked = true;
            await _context.SaveChangesAsync();
        }

        public async Task<AuthResponseDto> RefreshAsync(string refreshToken)
        {
            var storedToken = await _context.RefreshTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Token == refreshToken);

            if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiresAt < DateTime.UtcNow)
            {
                throw new UnauthorizedException("Refresh token invalid or expired");
            }

            storedToken.IsRevoked = true;

            var result = await GenerateTokensAsync(storedToken.User);
            await _context.SaveChangesAsync();

            return result;
        }

        public async Task<AuthResponseDto> GenerateTokensAsync(User user)
        {
            var jwt = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            refreshToken.UserId = user.Id;

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                Token = jwt,
                RefreshToken = refreshToken.Token
            };
        }

    }
}
