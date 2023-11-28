import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
    // Estado inicial del formulario, que puede ser vacío para un nuevo usuario
    // o lleno con los datos de un usuario existente para editar.
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        fechaNacimiento: '', // Asegúrate de que este formato sea 'YYYY-MM-DD'
    });

    // Efecto para cargar los datos del usuario a editar cuando se reciban como prop.
    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre,
                apellido: user.apellido,
                edad: user.edad,
                fechaNacimiento: user.fechaNacimiento.split('T')[0], // Ajustar para formato 'YYYY-MM-DD T 23:22:23232S""
            });
        }
    }, [user]);

    // Maneja el cambio en los campos del formulario y actualiza el estado local.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Maneja la lógica para enviar el formulario.
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Inicializamos la URL y el método por defecto para un nuevo usuario
        let url = '/api/Usuarios';
        let method = 'POST';
        let body = JSON.stringify(formData); // formData debe contener los datos del formulario

        // Si estamos editando un usuario existente (user no es null y tiene un usuarioID)
        if (user && user.usuarioID) {
            url = `/api/Usuarios/${user.usuarioID}`;
            method = 'PUT';
            body = JSON.stringify({
                ...formData,
                usuarioID: user.usuarioID, // Asegúrate de incluir el usuarioID al actualizar
            });
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            onSave(); // Llama a esta función para notificar el éxito de la operación
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <h2>{user ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            <div>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Edad:
                    <input
                        type="number"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Fecha de Nacimiento:
                    <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
};

export default UserForm;
