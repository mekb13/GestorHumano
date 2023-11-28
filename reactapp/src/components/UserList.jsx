// src/components/UserList.jsx
import React from 'react';

const UserList = ({ users, onEdit, loading, onDelete, onManagePermisos }) => {
    if (loading) {
        return <p><em>Cargando...</em></p>;
    }
       return (
        <table className='table table-striped' aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Fecha de Nacimiento</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.usuarioID}>
                        <td>{user.usuarioID}</td>
                        <td>{user.nombre}</td>
                        <td>{user.apellido}</td>
                        <td>{user.edad}</td>
                        <td>{new Date(user.fechaNacimiento).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => onEdit(user)}>Editar</button>
                            <button onClick={() => onDelete(user.usuarioID)}>Eliminar</button>
                            <button onClick={() => onManagePermisos(user.usuarioID)}>Gestionar Permisos</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
