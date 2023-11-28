import React, { Component } from 'react';
import UserCrud from './components/UserCrud';
import PermisosCrud from './components/PermisosCrud';
import './App.css'; // Importa tu archivo CSS aquí
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'users', // 'users' o 'permisos'
        };
    }

    // Función para cambiar la pestaña actual
    changeTab = (tab) => {
        this.setState({ currentTab: tab });
    };

    render() {
        const { currentTab } = this.state;

        return (
            <div className="app-container"> {/* Usa la clase app-container para centrar */}
                <h1>Gestión de Usuarios y Permisos</h1>
                <div className="tab-button-container"> {/* Contenedor para los botones de pestañas */}
                    <button
                        className={`tab-button ${currentTab === 'users' ? 'active' : ''}`}
                        onClick={() => this.changeTab('users')}>
                        Usuarios
                    </button>
                    <button
                        className={`tab-button ${currentTab === 'permisos' ? 'active' : ''}`}
                        onClick={() => this.changeTab('permisos')}>
                        Permisos
                    </button>
                </div>
                {currentTab === 'users' && <UserCrud />}
                {currentTab === 'permisos' && <PermisosCrud />}
            </div>
        );
    }
}
