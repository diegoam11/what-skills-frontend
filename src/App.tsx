import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardView } from './pages/dashboard/DashboardView';
import { LoginView } from './pages/login/LoginView';
import { RegisterView } from './pages/register/RegisterView';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if there's an active session
        const token = localStorage.getItem('userToken');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                />
                <Route 
                    path="/login" 
                    element={!isAuthenticated ? <LoginView /> : <Navigate to="/dashboard" />} 
                />
                <Route 
                    path="/register" 
                    element={!isAuthenticated ? <RegisterView /> : <Navigate to="/dashboard" />} 
                />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <DashboardView /> : <Navigate to="/login" />}
                />
                {/* Catch all route */}
                <Route 
                    path="*" 
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
