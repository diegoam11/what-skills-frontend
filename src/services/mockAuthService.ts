// Servicio de autenticación simulado para presentación (sin backend real)

export interface MockUser {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  career?: string;
  job?: string;
  displayName: string;
  createdAt: string;
}

export interface StoredUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
  career?: string;
  job?: string;
  displayName: string;
}

class MockAuthService {
  private tokenKey = 'userToken';
  private userKey = 'userData';
  private usersStorageKey = 'mockUsers';

  // Inicializar usuarios desde JSON
  private async initializeUsers(): Promise<MockUser[]> {
    try {
      // Intentar obtener usuarios de localStorage
      const storedUsers = localStorage.getItem(this.usersStorageKey);
      if (storedUsers) {
        return JSON.parse(storedUsers);
      }

      // Si no hay usuarios en localStorage, cargar desde JSON
      const response = await fetch('/users.json');
      const data = await response.json();
      
      // Guardar en localStorage para persistencia durante la sesión
      localStorage.setItem(this.usersStorageKey, JSON.stringify(data.users));
      
      return data.users;
    } catch (error) {
      console.error('Error loading users:', error);
      // Retornar usuarios por defecto si hay error
      const defaultUsers: MockUser[] = [
        {
          id: '1',
          email: 'admin@whatskills.com',
          password: '123456',
          role: 'admin',
          career: 'sistemas',
          job: 'fullstack',
          displayName: 'Usuario Admin',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(this.usersStorageKey, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obtener datos del usuario actual
  getUser(): StoredUser | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Login
  async login(email: string, password: string): Promise<StoredUser> {
    const users = await this.initializeUsers();
    
    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token simulado
    const token = `mock_token_${user.id}_${Date.now()}`;
    localStorage.setItem(this.tokenKey, token);

    // Guardar datos del usuario (sin contraseña)
    const storedUser: StoredUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      career: user.career,
      job: user.job,
      displayName: user.displayName
    };
    localStorage.setItem(this.userKey, JSON.stringify(storedUser));

    return storedUser;
  }

  // Verificar si el usuario actual es admin
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  // Registro
  async register(email: string, password: string, career: string, job: string): Promise<StoredUser> {
    const users = await this.initializeUsers();
    
    // Verificar si el email ya existe
    if (users.find(u => u.email === email)) {
      throw new Error('Este correo ya está registrado');
    }

    // Crear nuevo usuario
    const newUser: MockUser = {
      id: Date.now().toString(),
      email,
      password,
      role: 'user',
      career,
      job,
      displayName: email.split('@')[0],
      createdAt: new Date().toISOString()
    };

    // Agregar a la lista de usuarios
    users.push(newUser);
    localStorage.setItem(this.usersStorageKey, JSON.stringify(users));

    // Auto-login después del registro
    return await this.login(email, password);
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Obtener todos los usuarios (para debugging)
  async getAllUsers(): Promise<MockUser[]> {
    return await this.initializeUsers();
  }
}

export const mockAuthService = new MockAuthService();
export default mockAuthService;
