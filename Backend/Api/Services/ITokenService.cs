using Api.Models.Entities;

namespace Api.Services
{
    public interface ITokenService
    {
        string GenerateJwtToken(User user);
    }
}
