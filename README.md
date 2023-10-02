# ASP.NET_Paginacao
ASP.NET e EF Core Web API - Paginação de dados para múltiplos bancos de dados

# Cria um projeto Web API.

 - Cria uma api, cria um arquivo chamado Todo, na pasta Models.

<blockquete>

            public class Todo
            {
                public int Id { get; set; }
                public string Title { get; set; }
                public bool Done { get; set; }
                public DateTime CreatedAt { get; set; }
            }

</blockquete>

 - Instala o EF

<blockquete>

            dotnet tool install --global dotnet-ef

</blockquete>

 - Configuração do entityframework, no arquivo "AppDbContex", na pasta Data.

 - No arquivo "Program.cs" bota a configuração "builder.Services.AddDbContext<AppDbContext>();".

 - 

<blockquete>

            public DbSet<Todo> Todos { get; set; }

            protected override void OnConfiguring(
                DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseSqlite(connectionString: "DataSource=app.db;Cache=Shared");
            }

</blockquete>

 - Executa o comando no terminal do projeto.

<blockquete>

            dotnet ef migrations add CreateDatabase

</blockquete>

 - outro comando

<blockquete>

            dotnet ef datebase update

</blockquete>

 - Cria uma controller, a rota pode ser definido no "HttpGet" ou no "route".

 - O primeiro metodo é para alimentar a base de dados.

<blockquete>

            [HttpGet(template:"load")]
            public async Task<IActionResult> LoadAsync(
                [FromServices]AppDbContext context)
            {
                for (var i = 0; i <1348; i++)
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

</blockquete>

 - Cria o metodo que faz a consulta.
 - Limita a consulta usando skip e take.
 - Use o "AsNoTracking()" para....(pesquisar)

<blockquete>

                [HttpGet]
                public async Task<IActionResult> GetAsync(
                    [FromServices]AppDbContext context,
                    [FromQuery] int skip = 0,
                    [FromQuery] int take = 25)
                {
                    var todos = await context
                        .Todos
                        .AsNoTracking()
                        .Skip(skip)
                        .Take(take)
                        .ToListAsync();

                    return Ok(todos);
                }

</blockquete>

 - Da um "dotnet clean", "dotnet buil", e depois "dotnet run".
 - Roda no POSTMAN, o "load" e depois o todos.

<blockquete>

            http://localhost:5175/v1/todos/load

            http://localhost:5175/v1/todos

</blockquete>

 - Pode ser usando o "dotnet watch run", apara atualizar a cada mudança;

 - Define o [FromQuery] para o skip e o take.

 - Com isso eles pode receber o valor inicial e a quantidade de valores.

 - Pode usar também os parametros direto da rota. 

<blockquete>

            [HttpGet(template:"{skip}/{take}")]

</blockquete>

 - Se não explicitar ele vai ser por padrão um [FromRoute]. digita direto na barra.

 - Pode tipar para poder vim o valor numerico

<blockquete>

            [HttpGet(template:"{skip:int}/{take:int}")]

</blockquete>

 - Para paginar é só ir mudando o valor do skip e take.

<blockquete>

</blockquete>


 - 

<blockquete>

</blockquete>


 - 

<blockquete>

</blockquete>