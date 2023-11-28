using Microsoft.EntityFrameworkCore;
using YourNamespace.Models;

namespace YourNamespace.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsuarioPermiso>()
                .HasKey(up => new { up.UsuarioID, up.PermisoID });

            // ... otras configuraciones de modelo ...
        }


        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Permiso> Permiso { get; set; }
        public DbSet<UsuarioPermiso> UsuarioPermiso { get; set; }
    }
}
