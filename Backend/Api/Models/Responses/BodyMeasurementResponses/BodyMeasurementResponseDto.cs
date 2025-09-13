namespace Api.Models.Responses.BodyMeasurementResponses
{
    public class BodyMeasurementResponseDto
    {
        public int Id { get; set; }
        public int WeightKg { get; set; }
        public int HeightCm { get; set; }
        public int BodyFatPercent {  get; set; }
        public DateTime MeasurementDate { get; set; }
    }
}
