import React, { Component } from 'react';
import './UsuarioPermisosCrud.css';

export default class UsuarioPermisosCrud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permisos: [],
            todosLosPermisos: [],
            loading: true,
            usuarioId: props.usuarioId, // Asumiendo que se pasa el ID del usuario
            selectedPermisoId: 0, // Permiso seleccionado para agregar
        };
    }

    componentDidMount() {
        this.populatePermisosData();
        this.populateTodosLosPermisosData();
    }

    populatePermisosData = async () => {
        try {
            const response = await fetch(`/api/UsuarioPermiso/${this.state.usuarioId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const permisos = await response.json();
            this.setState({ permisos, loading: false });
        } catch (error) {
            console.error("Error fetching permisos data:", error);
        }
    };

    populateTodosLosPermisosData = async () => {
        try {
            const response = await fetch('/api/Permisos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const todosLosPermisos = await response.json();
            this.setState({ todosLosPermisos });
        } catch (error) {
            console.error("Error fetching all permisos data:", error);
        }
    };

    handleSelectPermiso = (e) => {
        this.setState({ selectedPermisoId: e.target.value });
    };

    handleAddPermiso = async () => {
        try {
            if (this.state.selectedPermisoId === "") {
                // No hacer nada si se seleccionó "Ninguno"
                return;
            }
            const response = await fetch(`/api/UsuarioPermiso?usuarioId=${this.state.usuarioId}&permisoId=${this.state.selectedPermisoId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.populatePermisosData(); // Actualizar la lista de permisos
        } catch (error) {
            console.error("Error adding permiso:", error);
        }
    };

    handleDeletePermiso = async (permisoId) => {
        try {
            const response = await fetch(`/api/UsuarioPermiso?usuarioId=${this.state.usuarioId}&permisoId=${permisoId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.populatePermisosData(); // Actualizar la lista de permisos
        } catch (error) {
            console.error("Error deleting permiso:", error);
        }
    };

    render() {
        const { permisos, todosLosPermisos, loading, selectedPermisoId } = this.state;

        return (
            <section className="usuario-permisos-crud">
                <header>
                    <h2>Permisos del Usuario</h2>
                </header>
                {loading ? (
                    <p>Cargando permisos...</p>
                ) : (
                    <div className="permisos-container">
                        <div className="permisos-selector">
                            <select
                                onChange={this.handleSelectPermiso}
                                value={selectedPermisoId}
                            >
                                <option value="">Ninguno</option>
                                {todosLosPermisos.map(permiso => (
                                    <option key={permiso.permisoID} value={permiso.permisoID}>
                                        {permiso.descripcionPermiso}
                                    </option>
                                ))}
                            </select>
                            <button className="add-permiso" onClick={this.handleAddPermiso}>
                                Añadir Permiso
                            </button>
                        </div>
                        <ul className="permisos-list">
                            {permisos.map(permiso => (
                                <li key={permiso.permisoID}>
                                    {permiso.descripcionPermiso}
                                    <button
                                        className="delete-permiso"
                                        onClick={() => this.handleDeletePermiso(permiso.permisoID)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        );
    }
}
