using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class FinalVersion01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessions_WorkoutPlanDays_WorkoutPlanDayId",
                table: "WorkoutSessions");

            migrationBuilder.AlterColumn<int>(
                name: "WorkoutPlanDayId",
                table: "WorkoutSessions",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessions_WorkoutPlanDays_WorkoutPlanDayId",
                table: "WorkoutSessions",
                column: "WorkoutPlanDayId",
                principalTable: "WorkoutPlanDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessions_WorkoutPlanDays_WorkoutPlanDayId",
                table: "WorkoutSessions");

            migrationBuilder.AlterColumn<int>(
                name: "WorkoutPlanDayId",
                table: "WorkoutSessions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessions_WorkoutPlanDays_WorkoutPlanDayId",
                table: "WorkoutSessions",
                column: "WorkoutPlanDayId",
                principalTable: "WorkoutPlanDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
