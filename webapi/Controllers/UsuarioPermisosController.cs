using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YourNamespace.Data;
using YourNamespace.Models;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class UsuarioPermisoController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsuarioPermisoController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Asignar un permiso a un usuario
    [HttpPost]
    public async Task<IActionResult> AsignarPermisoAUsuario(int usuarioId, int permisoId)
    {
        var usuarioPermiso = new UsuarioPermiso
        {
            UsuarioID = usuarioId,
            PermisoID = permisoId
        };

        // Verificar si la asignación ya existe
        if (_context.UsuarioPermiso.Any(up => up.UsuarioID == usuarioId && up.PermisoID == permisoId))
        {
            return BadRequest("El permiso ya está asignado a este usuario.");
        }

        _context.UsuarioPermiso.Add(usuarioPermiso);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(ObtenerPermisosPorUsuario), new { usuarioId = usuarioId }, usuarioPermiso);
    }

    // Remover un permiso de un usuario
    [HttpDelete]
    public async Task<IActionResult> RemoverPermisoDeUsuario(int usuarioId, int permisoId)
    {
        var usuarioPermiso = await _context.UsuarioPermiso
            .FirstOrDefaultAsync(up => up.UsuarioID == usuarioId && up.PermisoID == permisoId);

        if (usuarioPermiso == null)
        {
            return NotFound("La asignación de permiso no existe.");
        }

        _context.UsuarioPermiso.Remove(usuarioPermiso);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Listar los permisos de un usuario
    [HttpGet("{usuarioId}")]
    public async Task<ActionResult> ObtenerPermisosPorUsuario(int usuarioId)
    {
        var permisos = await _context.UsuarioPermiso
            .Include(up => up.Permiso)
            .Where(up => up.UsuarioID == usuarioId)
            .Select(up => up.Permiso)
            .ToListAsync();

        if (permisos == null)
        {
            return NotFound("No se encontraron permisos para este usuario.");
        }

        return Ok(permisos);
    }
}
