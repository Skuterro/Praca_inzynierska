using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class update0002 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sets",
                table: "DayExercises",
                newName: "Sets");

            migrationBuilder.RenameColumn(
                name: "reps",
                table: "DayExercises",
                newName: "Reps");

            migrationBuilder.AlterColumn<int>(
                name: "WeekDay",
                table: "WorkoutPlanDays",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 9);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "OneRepMaxes",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "OneRepMaxes");

            migrationBuilder.RenameColumn(
                name: "Sets",
                table: "DayExercises",
                newName: "sets");

            migrationBuilder.RenameColumn(
                name: "Reps",
                table: "DayExercises",
                newName: "reps");

            migrationBuilder.AlterColumn<string>(
                name: "WeekDay",
                table: "WorkoutPlanDays",
                type: "TEXT",
                maxLength: 9,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }
    }
}
