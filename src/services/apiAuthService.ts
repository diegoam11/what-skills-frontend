import type { IAuthService } from "./IAuthService";
import type { User } from "../types/domain/User";
import { type LoginRequest, type RegisterRequest, type RegisterBackendPayload, type UserUpdateRequest, authAPI } from "../api/endpoints";
import type { apiClient } from "../api/base";

class ApiAuthService implements IAuthService {
    private tokenKey = 'userToken';

    async login(credentials: LoginRequest): Promise<User> {
        // 1. Obtener Token del Backend
        const response = await authAPI.login(credentials);

        // 2. Guardar Token
        localStorage.setItem(this.tokenKey, response.access_token);

        // 3. Obtener datos del usuario usando el  token
        return await this.getCurrentUserFromApi();
    }

    async register(data: RegisterRequest): Promise<User> {

        const payload: RegisterBackendPayload = {
            email: data.email,
            password: data.password,
            full_name: `${data.first_name} ${data.last_name}`.trim(),           // ¡Aquí está la magia!
            career_target: data.career,    // Mapeamos career -> career_target
            job_target: data.job
        }


        // 1. Registrar
        await authAPI.register(payload);

        // 2. Auto-login
        return this.login({ email: data.email, password: data.password });
    }

    async updateProfile(data: UserUpdateRequest): Promise<User> {
        // 1. Llamar al backend (necesitaremos agregar esto a endpoints.ts también)
        const updatedUser = await authAPI.updateProfile(data);

        // 2. IMPORTANTE: Actualizar el token o el estado local si fuera necesario.
        // Como el token JWT no cambia sus datos internos automáticamente, 
        // confiamos en que al recargar la página o llamar a refreshToken obtendremos los datos nuevos.
        return updatedUser;
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        // Recargar para limpiar estado
        window.location.href = '/login';
    }

    // Helper para obtener datos frescos del backend
    private async getCurrentUserFromApi(): Promise<User> {
        try {
            const user = await authAPI.getCurrentUser();
            return user;
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    // En la versión API, no guardamos el usuario completo en localStorage,
    // solo el token. Los datos se piden al cargar la app.
    getCurrentUser(): User | null {
        // Este método es síncrono para compatibilidad, pero en API real
        // idealmente usaríamos el estado de React o una llamada async.
        // Para no romper tu app ahora, devolvemos null y dejamos que 
        // refreshToken haga el trabajo sucio.
        return null;
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    async refreshToken(): Promise<User | null> {
        if (!this.isAuthenticated()) return null;
        try {
            return await this.getCurrentUserFromApi();
        } catch (error) {
            return null;
        }
    }

    isAdmin(): boolean {
        // Esto lo sabremos después de cargar el usuario
        return false;
    }
}

export const apiAuthService = new ApiAuthService();