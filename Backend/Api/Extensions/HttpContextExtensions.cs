using System.Security.Claims;

namespace Api.Extensions
{
    public static class HttpContextExtensions
    {
        public static string? GetUserId(this HttpContext context)
        {
            return context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
