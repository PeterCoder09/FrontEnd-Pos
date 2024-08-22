import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Bienvenido al Dashboard</h2>
                    <p className="card-text">Aquí puedes ver la información relevante después de iniciar sesión.</p>
                    {/* Agrega más contenido o componentes aquí */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
