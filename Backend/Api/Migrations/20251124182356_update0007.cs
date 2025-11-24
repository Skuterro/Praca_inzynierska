using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class update0007 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessionExercises_Exercises_ExericseId",
                table: "WorkoutSessionExercises");

            migrationBuilder.RenameColumn(
                name: "ExericseId",
                table: "WorkoutSessionExercises",
                newName: "DayExericseId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutSessionExercises_ExericseId",
                table: "WorkoutSessionExercises",
                newName: "IX_WorkoutSessionExercises_DayExericseId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessionExercises_DayExercises_DayExericseId",
                table: "WorkoutSessionExercises",
                column: "DayExericseId",
                principalTable: "DayExercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessionExercises_DayExercises_DayExericseId",
                table: "WorkoutSessionExercises");

            migrationBuilder.RenameColumn(
                name: "DayExericseId",
                table: "WorkoutSessionExercises",
                newName: "ExericseId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutSessionExercises_DayExericseId",
                table: "WorkoutSessionExercises",
                newName: "IX_WorkoutSessionExercises_ExericseId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessionExercises_Exercises_ExericseId",
                table: "WorkoutSessionExercises",
                column: "ExericseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
