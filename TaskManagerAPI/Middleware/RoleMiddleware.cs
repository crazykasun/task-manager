using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace TaskManagerAPI.Middleware
{
    public class RoleMiddleware
    {
        private readonly RequestDelegate _next;

        public RoleMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var userRole = context.Request.Headers["Role"].ToString();

            if (string.IsNullOrEmpty(userRole))
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Role header is missing.");
                return;
            }

            context.Items["UserRole"] = userRole;
            await _next(context);
        }
    }
}
