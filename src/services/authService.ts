import { authAPI, LoginRequest, RegisterRequest, User, AuthResponse } from '../api/endpoints';

class AuthService {
  private tokenKey = 'userToken';
  private userKey = 'userData';

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Get stored user data
  getUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Login user
  async login(credentials: LoginRequest): Promise<User> {
    try {
      // Get auth token
      const authResponse: AuthResponse = await authAPI.login(credentials);
      
      // Store token
      localStorage.setItem(this.tokenKey, authResponse.access_token);
      
      // Get user data
      const user = await authAPI.getCurrentUser();
      
      // Store user data
      localStorage.setItem(this.userKey, JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register user
  async register(userData: RegisterRequest): Promise<User> {
    try {
      const user = await authAPI.register(userData);
      
      // Auto-login after registration
      await this.login({
        email: userData.email,
        password: userData.password
      });
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    window.location.href = '/login';
  }

  // Refresh user data
  async refreshUser(): Promise<User | null> {
    try {
      if (!this.isAuthenticated()) {
        return null;
      }
      
      const user = await authAPI.getCurrentUser();
      localStorage.setItem(this.userKey, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();
export default authService;
