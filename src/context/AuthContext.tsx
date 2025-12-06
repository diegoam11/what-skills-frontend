import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/domain/User';
import { authService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar los datos del usuario desde el Backend
  const refreshUser = async () => {
    try {
      const userData = await authService.refreshToken(); // Esto llama a /auth/me
      setUser(userData);
    } catch (error) {
      console.error("Error cargando sesión:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Al iniciar la app, intentamos recuperar la sesión
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};