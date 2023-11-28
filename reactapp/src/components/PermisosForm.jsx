// src/components/PermisosForm.jsx
import React, { useState, useEffect } from 'react';

const PermisosForm = ({ permiso, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        descripcionPermiso: '',
    });

    useEffect(() => {
        if (permiso) {
            setFormData({ descripcionPermiso: permiso.descripcionPermiso });
        }
    }, [permiso]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Define si es un nuevo permiso o uno existente por la presencia de permisoID
        const isEditing = permiso && permiso.permisoID;
        const url = isEditing ? `/api/Permisos/${permiso.permisoID}` : '/api/Permisos';
        const method = isEditing ? 'PUT' : 'POST';

        const payload = {
            descripcionPermiso: formData.descripcionPermiso,
        };

        // Incluye el permisoID solo si es una edición
        if (isEditing) {
            payload.permisoID = permiso.permisoID;
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Si la respuesta no es exitosa, lanza un error
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Aquí podrías llamar a onSave() o alguna función similar
            // que actualice la lista de permisos en el componente padre
            onSave();
        } catch (error) {
            console.error('Error al guardar el permiso:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>{permiso ? 'Editar Permiso' : 'Crear Permiso'}</h2>
            <label>
                Descripción del Permiso:
                <input
                    type="text"
                    name="descripcionPermiso"
                    value={formData.descripcionPermiso}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default PermisosForm;
