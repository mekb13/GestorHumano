import React, { Component } from 'react';
import UserCrud from './components/UserCrud';
import PermisosCrud from './components/PermisosCrud';
import './App.css'; // Importa tu archivo CSS aqu�
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'users', // 'users' o 'permisos'
        };
    }

    // Funci�n para cambiar la pesta�a actual
    changeTab = (tab) => {
        this.setState({ currentTab: tab });
    };

    render() {
        const { currentTab } = this.state;

        return (
            <div className="app-container"> {/* Usa la clase app-container para centrar */}
                <h1>Gesti�n de Usuarios y Permisos</h1>
                <div className="tab-button-container"> {/* Contenedor para los botones de pesta�as */}
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
