import React, { Component } from 'react';
import PermisosList from './PermisosList';
import PermisosForm from './PermisosForm';

export default class PermisosCrud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permisos: [],
            loading: true,
            showPermisosForm: false,
            permisoToEdit: null,
        };
    }

    componentDidMount() {
        this.populatePermisosData();
    }

    populatePermisosData = async () => {
        this.setState({ loading: true });
        try {
            const response = await fetch('/api/Permisos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const permisos = await response.json();
            this.setState({ permisos, loading: false });
        } catch (error) {
            console.error("Error fetching permisos data:", error);
            this.setState({ loading: false });
        }
    };

    handleAddPermiso = () => {
        this.setState({ showPermisosForm: true, permisoToEdit: null });
    };

    handleEditPermiso = (permiso) => {
        this.setState({ showPermisosForm: true, permisoToEdit: permiso });
    };

    handleDeletePermiso = async (permisoId) => {
        try {
            const response = await fetch(`/api/Permisos/${permisoId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                // Si la respuesta no es OK, lanza un error para entrar en el bloque catch
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Si la eliminación fue exitosa, recarga los permisos del usuario
            this.populatePermisosData();
        } catch (error) {
            console.error("Error deleting permiso:", error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    };

    handleSavePermiso = (permisoData) => {
        // Guardar o actualizar permiso y actualizar lista
        this.setState({ showPermisosForm: false });
        this.populatePermisosData();
    };

    handleCancelEdit = () => {
        this.setState({ showPermisosForm: false, permisoToEdit: null });
    };

    render() {
        const { permisos, loading, showPermisosForm, permisoToEdit } = this.state;

        return (
            <div>
                {loading && <p>Cargando permisos...</p>}
                {!showPermisosForm && (
                    <div>
                        <button onClick={this.handleAddPermiso}>Añadir Nuevo Permiso</button>
                        <PermisosList
                            permisos={permisos}
                            onEdit={this.handleEditPermiso}
                            onDelete={this.handleDeletePermiso}
                        />
                    </div>
                )}
                {showPermisosForm && (
                    <PermisosForm
                        permiso={this.state.permisoToEdit}
                        onSave={this.handleSavePermiso} // Función para guardar el permiso
                        onCancel={this.handleCancelEdit}
                    />
                )}
            </div>
        );
    }
}
