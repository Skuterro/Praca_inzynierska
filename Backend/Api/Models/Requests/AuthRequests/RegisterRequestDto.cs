using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.Data;

namespace Api.Models.Requests.AuthRequests
{
    public class RegisterRequestDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;
    }
}
