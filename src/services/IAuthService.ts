import type { User } from "../types/domain/User";
import type { LoginRequest, RegisterRequest } from "../api/endpoints"; // O mueve estos requests a domain también

export interface IAuthService {
  login(credentials: LoginRequest): Promise<User>;
  register(data: RegisterRequest): Promise<User>;
  logout(): void;
  getCurrentUser(): User | null;
  isAuthenticated(): boolean;
  refreshToken(): Promise<User | null>;
  getToken(): string | null; // <--- Agregado
  isAdmin(): boolean;        // <--- Agregado
}