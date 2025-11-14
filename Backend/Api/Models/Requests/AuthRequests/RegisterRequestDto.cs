using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.Data;

namespace Api.Models.Requests.AuthRequests
{
    public class RegisterRequestDto : LoginRequestDto
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; } = null!;
    }
}
