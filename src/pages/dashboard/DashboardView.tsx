import React from 'react';

export const DashboardView = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Gestión de perfiles profesionales</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Mi Perfil</h2>
                        <p className="text-gray-600">Gestiona tu información profesional</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Habilidades</h2>
                        <p className="text-gray-600">Administra tus skills técnicos</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Proyectos</h2>
                        <p className="text-gray-600">Muestra tu portafolio</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
