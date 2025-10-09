import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardView } from './pages/dashboard/DashboardView';
import { LoginView } from './pages/login/LoginView';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar si hay sesión activa
        const token = localStorage.getItem('userToken');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginView />}
                />
                <Route path="/login" element={<LoginView />} />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <DashboardView /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
