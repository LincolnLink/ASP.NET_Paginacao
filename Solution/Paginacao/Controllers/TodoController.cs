using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Paginacao.Data;
using Paginacao.Models;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.Intrinsics;

namespace Paginacao.Controllers
{
    [Route(template: "v1/todos")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        [HttpGet(template: "load")]
        public async Task<IActionResult> LoadAsync(
            [FromServices] AppDbContext context)
        {
            for (var i = 0; i < 1348; i++)
            {
                var todo = new Todo()
                {
                    Id = i + 1,
                    Done = false,
                    CreatedAt = DateTime.Now,
                    Title = $"Tarefa {i}"
                };
                await context.Todos.AddAsync(todo);
                await context.SaveChangesAsync();
            }
            return Ok();
        }


        //[HttpGet(template: "{page:int}/{pageSize:int}")]
        [HttpGet]
        public async Task<IActionResult> GetAsync(
           [FromServices]AppDbContext context,
           int page = 1,
           int pageSize = 10)
        {
            var total = await context.Todos.CountAsync();
            var data = await context
                .Todos
                .AsNoTracking()
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                total,
                data
            });
        }
    }
}
