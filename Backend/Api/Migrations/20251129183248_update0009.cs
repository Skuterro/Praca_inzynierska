using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class update0009 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OneRepMaxes_Exercises_ExerciseId",
                table: "OneRepMaxes");

            migrationBuilder.DropIndex(
                name: "IX_OneRepMaxes_ExerciseId",
                table: "OneRepMaxes");

            migrationBuilder.DropColumn(
                name: "MeasurementDate",
                table: "BodyMeasurements");

            migrationBuilder.RenameColumn(
                name: "ExerciseId",
                table: "OneRepMaxes",
                newName: "Exercise");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Exercise",
                table: "OneRepMaxes",
                newName: "ExerciseId");

            migrationBuilder.AddColumn<DateTime>(
                name: "MeasurementDate",
                table: "BodyMeasurements",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_OneRepMaxes_ExerciseId",
                table: "OneRepMaxes",
                column: "ExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_OneRepMaxes_Exercises_ExerciseId",
                table: "OneRepMaxes",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
