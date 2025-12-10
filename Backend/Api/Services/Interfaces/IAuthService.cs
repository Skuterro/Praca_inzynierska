using Api.Models.Entities;
using Api.Models.Requests.AuthRequests;
using Api.Models.Responses.AuthResponses;

namespace Api.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);
        Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
        Task LogoutAsync(string refreshToken);
        Task<AuthResponseDto> RefreshAsync(string refreshToken);
        Task<AuthResponseDto> GenerateTokensAsync(User user);

    }
}
