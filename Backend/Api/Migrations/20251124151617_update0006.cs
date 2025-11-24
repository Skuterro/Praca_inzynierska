using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class update0006 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessionSets_Exercises_ExerciseId",
                table: "WorkoutSessionSets");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessionSets_WorkoutSessions_WorkoutSessionId",
                table: "WorkoutSessionSets");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutSessionSets_ExerciseId",
                table: "WorkoutSessionSets");

            migrationBuilder.DropColumn(
                name: "ExerciseId",
                table: "WorkoutSessionSets");

            migrationBuilder.RenameColumn(
                name: "WorkoutSessionId",
                table: "WorkoutSessionSets",
                newName: "WorkoutSessionExerciseId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutSessionSets_WorkoutSessionId",
                table: "WorkoutSessionSets",
                newName: "IX_WorkoutSessionSets_WorkoutSessionExerciseId");

            migrationBuilder.RenameColumn(
                name: "SessionDate",
                table: "WorkoutSessions",
                newName: "Start");

            migrationBuilder.AddColumn<DateTime>(
                name: "End",
                table: "WorkoutSessions",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsFinished",
                table: "WorkoutSessions",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "WorkoutSessionExercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WorkoutSessionId = table.Column<int>(type: "INTEGER", nullable: false),
                    ExericseId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutSessionExercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkoutSessionExercises_Exercises_ExericseId",
                        column: x => x.ExericseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkoutSessionExercises_WorkoutSessions_WorkoutSessionId",
                        column: x => x.WorkoutSessionId,
                        principalTable: "WorkoutSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutSessionExercises_ExericseId",
                table: "WorkoutSessionExercises",
                column: "ExericseId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutSessionExercises_WorkoutSessionId",
                table: "WorkoutSessionExercises",
                column: "WorkoutSessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessionSets_WorkoutSessionExercises_WorkoutSessionExerciseId",
                table: "WorkoutSessionSets",
                column: "WorkoutSessionExerciseId",
                principalTable: "WorkoutSessionExercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessionSets_WorkoutSessionExercises_WorkoutSessionExerciseId",
                table: "WorkoutSessionSets");

            migrationBuilder.DropTable(
                name: "WorkoutSessionExercises");

            migrationBuilder.DropColumn(
                name: "End",
                table: "WorkoutSessions");

            migrationBuilder.DropColumn(
                name: "IsFinished",
                table: "WorkoutSessions");

            migrationBuilder.RenameColumn(
                name: "WorkoutSessionExerciseId",
                table: "WorkoutSessionSets",
                newName: "WorkoutSessionId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutSessionSets_WorkoutSessionExerciseId",
                table: "WorkoutSessionSets",
                newName: "IX_WorkoutSessionSets_WorkoutSessionId");

            migrationBuilder.RenameColumn(
                name: "Start",
                table: "WorkoutSessions",
                newName: "SessionDate");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseId",
                table: "WorkoutSessionSets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutSessionSets_ExerciseId",
                table: "WorkoutSessionSets",
                column: "ExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessionSets_Exercises_ExerciseId",
                table: "WorkoutSessionSets",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessionSets_WorkoutSessions_WorkoutSessionId",
                table: "WorkoutSessionSets",
                column: "WorkoutSessionId",
                principalTable: "WorkoutSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
