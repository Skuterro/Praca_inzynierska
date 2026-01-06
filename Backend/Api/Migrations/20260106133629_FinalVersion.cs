using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class FinalVersion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BodyMeasurements_UserId",
                table: "BodyMeasurements");

            migrationBuilder.CreateIndex(
                name: "IX_BodyMeasurements_UserId",
                table: "BodyMeasurements",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BodyMeasurements_UserId",
                table: "BodyMeasurements");

            migrationBuilder.CreateIndex(
                name: "IX_BodyMeasurements_UserId",
                table: "BodyMeasurements",
                column: "UserId");
        }
    }
}
