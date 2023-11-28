using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YourNamespace.Data;
using YourNamespace.Models;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class PermisosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PermisosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Permisos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Permiso>>> GetPermisos()
    {
        return await _context.Permiso.ToListAsync();
    }

    // GET: api/Permisos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Permiso>> GetPermiso(int id)
    {
        var permiso = await _context.Permiso.FindAsync(id);

        if (permiso == null)
        {
            return NotFound();
        }

        return permiso;
    }

    // PUT: api/Permisos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPermiso(int id, Permiso permiso)
    {
        if (id != permiso.PermisoID)
        {
            return BadRequest();
        }

        _context.Entry(permiso).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PermisoExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Permisos
    [HttpPost]
    public async Task<ActionResult<Permiso>> PostPermiso(Permiso permiso)
    {
        _context.Permiso.Add(permiso);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetPermiso", new { id = permiso.PermisoID }, permiso);
    }

    // DELETE: api/Permisos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePermiso(int id)
    {
        var permiso = await _context.Permiso.FindAsync(id);
        if (permiso == null)
        {
            return NotFound();
        }

        _context.Permiso.Remove(permiso);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PermisoExists(int id)
    {
        return _context.Permiso.Any(e => e.PermisoID == id);
    }
}
