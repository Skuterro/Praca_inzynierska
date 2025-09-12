using Api.Models.Entities;

namespace Api.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(User user);
        RefreshToken GenerateRefreshToken();
    }
}
