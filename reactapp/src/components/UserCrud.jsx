import React, { Component } from 'react';
import UserList from './UserList'; // Asegúrate de que este componente está correctamente implementado
import UserForm from './UserForm'; // Asegúrate de que este componente está correctamente implementado

import UsuarioPermisosCrud from './UsuarioPermisosCrud';

export default class UserCrud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            showUserForm: false,
            userToEdit: null,
            showPermisosCrud: false, // Nuevo estado para controlar la visualización de UsuarioPermisosCrud
            selectedUserId: null, // ID del usuario seleccionado para gestionar permisos
        };
    }
    componentDidMount() {
        this.populateUserData();
    }

    populateUserData = async () => {
        this.setState({ loading: true });
        try {
            const response = await fetch('/api/Usuarios');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            this.setState({ users, loading: false });
        } catch (error) {
            console.error("Error fetching user data:", error);
            this.setState({ loading: false });
        }
    };

    handleAddUser = () => {
        this.setState({
            showUserForm: true,
            userToEdit: null, // Asegúrate de que no hay usuario a editar
        });
    };

    handleEditUser = (user) => {
        this.setState({
            showUserForm: true,
            userToEdit: user,
        });
    };

    handleDeleteUser = async (userId) => {
        try {
            await fetch(`/api/Usuarios/${userId}`, { method: 'DELETE' });
            this.populateUserData();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    handleSaveUser = async (user) => {
        try {
            const method = user.usuarioID ? 'PUT' : 'POST';
            const endpoint = user.usuarioID ? `/api/Usuarios/${user.usuarioID}` : '/api/Usuarios/';

            await fetch(endpoint, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            this.populateUserData();
        } catch (error) {
            console.error("Error saving user:", error);
        } finally {
            this.handleCancelEdit(); // Cierra el formulario después de guardar
            this.populateUserData(); 
        }
    };

    handleCancelEdit = () => {
        this.setState({ showUserForm: false, userToEdit: null });
    };

    handleManagePermisos = (userId) => {
        console.log("Gestionar permisos para usuario:", userId); // Depuración
        this.setState({
            showPermisosCrud: true,
            selectedUserId: userId,
            showUserForm: false,
        });
    };


    handleBackToUsers = () => {
        this.setState({
            showPermisosCrud: false,
            selectedUserId: null,
        });
    };
    render() {
        const { users, loading, showUserForm, userToEdit, showPermisosCrud, selectedUserId } = this.state;
        if (this.state.showPermisosCrud) {
            return (
                <UsuarioPermisosCrud
                    usuarioId={this.state.selectedUserId}
                    onBack={this.handleBackToUsers}
                />
            );
        }
        return (
            <div>
                
                {loading && <p>Cargando usuarios...</p>}
                {!showUserForm && (
                    <div>
                        <button onClick={this.handleAddUser}>Añadir Nuevo Usuario</button>
                        <UserList
                           // users={users}
                            onEdit={this.handleEditUser}
                            onDelete={this.handleDeleteUser}
                            users={this.state.users}
                            onManagePermisos={this.handleManagePermisos}
                        />
                    </div>
                )}
                {showUserForm && (
                    <UserForm
                        user={userToEdit}
                        onSave={this.handleSaveUser}
                        onCancel={this.handleCancelEdit}
                    />
                )}
            </div>
        );
    }
}
