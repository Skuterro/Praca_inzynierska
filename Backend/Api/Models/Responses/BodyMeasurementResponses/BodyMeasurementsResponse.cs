namespace Api.Models.Responses.BodyMeasurementResponses
{
    public class BodyMeasurementsResponse
    {
        public int Id { get; set; }
        public decimal? WeightKg { get; set; }
        public decimal? HeightCm { get; set; }
        public int? BodyFatPercent {  get; set; }
    }
}
