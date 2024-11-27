using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskManagerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleToTaskItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Category", "Description", "IsCompleted", "Role", "Title" },
                values: new object[,]
                {
                    { 1, "Management", "Task for Admin only", false, "Admin", "Admin Task" },
                    { 2, "General", "Task for regular user", false, "User", "User Task" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Tasks");
        }
    }
}
