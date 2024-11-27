using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>().HasData(
                new TaskItem
                {
                    Id = 1,
                    Title = "Admin Task",
                    Description = "Task for Admin only",
                    Category = "Management",
                    IsCompleted = false,
                    Role = "Admin"
                },
                new TaskItem
                {
                    Id = 2,
                    Title = "User Task",
                    Description = "Task for regular user",
                    Category = "General",
                    IsCompleted = false,
                    Role = "User"
                }
            );
        }
    }
}
