using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class update0008 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessionExercises_DayExercises_DayExericseId",
                table: "WorkoutSessionExercises");

            migrationBuilder.RenameColumn(
                name: "DayExericseId",
                table: "WorkoutSessionExercises",
                newName: "DayExerciseId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutSessionExercises_DayExericseId",
                table: "WorkoutSessionExercises",
                newName: "IX_WorkoutSessionExercises_DayExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessionExercises_DayExercises_DayExerciseId",
                table: "WorkoutSessionExercises",
                column: "DayExerciseId",
                principalTable: "DayExercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessionExercises_DayExercises_DayExerciseId",
                table: "WorkoutSessionExercises");

            migrationBuilder.RenameColumn(
                name: "DayExerciseId",
                table: "WorkoutSessionExercises",
                newName: "DayExericseId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutSessionExercises_DayExerciseId",
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
    }
}
