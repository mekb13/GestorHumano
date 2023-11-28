import React from 'react';

const PermisosList = ({ permisos, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descripción del Permiso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {permisos.map(permiso => (
                    <tr key={permiso.permisoID}>
                        <td>{permiso.permisoID}</td>
                        <td>{permiso.descripcionPermiso}</td>
                        <td>
                            <button onClick={() => onEdit(permiso)}>Editar</button>
                            <button onClick={() => onDelete(permiso.permisoID)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PermisosList;
