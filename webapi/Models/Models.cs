namespace YourNamespace.Models
{
    public class Usuario
    {
        public int UsuarioID { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Edad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        // Definir la relación con UsuarioPermiso
    }

    public class Permiso
    {
        public int PermisoID { get; set; }
        public string DescripcionPermiso { get; set; }
        // Definir la relación con UsuarioPermiso
    }

    // Si necesitas una clase para la relación muchos a muchos:
    public class UsuarioPermiso
    {
        public int UsuarioID { get; set; }
        public int PermisoID { get; set; }
        public Usuario Usuario { get; set; }
        public Permiso Permiso { get; set; }
    }
}
