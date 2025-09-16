namespace Api.Models.Responses.BodyMeasurementResponses
{
    public class BodyMeasurementResponseDto
    {
        public int Id { get; set; }
        public decimal WeightKg { get; set; }
        public decimal HeightCm { get; set; }
        public int BodyFatPercent {  get; set; }
        public DateTime MeasurementDate { get; set; }
    }
}
