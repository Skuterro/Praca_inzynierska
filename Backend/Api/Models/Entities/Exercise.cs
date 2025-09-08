using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public class Exercise
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = null!;

        public string Description { get; set; } = string.Empty;
    }
}
