using System.ComponentModel.DataAnnotations;

namespace Api.Models.Entities
{
    public enum BodyPartEnum
    {
        Chest = 1,
        Legs = 2,
        Back = 3,
        Shoulders = 4,
        Arms = 5,
        Core = 6
    }
    public class Exercise
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = null!;

        public BodyPartEnum BodyPart { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}
