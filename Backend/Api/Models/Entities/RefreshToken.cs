using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }
        public string Token { get; set; } = Guid.NewGuid().ToString();
        public DateTime ExpiresAt { get; set; }
        public bool IsRevoked { get; set; }

        public string UserId { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
