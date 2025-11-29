import type { IAuthService } from "./IAuthService";
import type { User } from "../types/domain/User";
import type { LoginRequest, RegisterRequest } from "../api/endpoints";

interface MockDatabaseUser extends User {
  password: string; // Campo extra solo para la DB interna
}


class MockAuthService implements IAuthService { // <--- CLAVE: implements
  private tokenKey = 'userToken';
  private userKey = 'userData';
  private usersStorageKey = 'mockUsers';

  // Convierte un usuario de la "Base de datos" a un usuario de "Dominio"
  // Esto elimina la contraseña antes de devolver los datos a la app.
  private mapToDomainUser(dbUser: MockDatabaseUser): User {
    // Desestructuramos para separar la contraseña del resto
    const { password: password, ...domainUser } = dbUser;
    return domainUser as User;
  }

  // Inicializar usuarios desde JSON
  private async initializeUsers(): Promise<MockDatabaseUser[]> {
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
      const defaultUser: MockDatabaseUser = {
        id: '1',
        email: 'admin@whatskills.com',
        password: '123456',
        role: 'admin',
        displayName: 'Usuario Admin',
        createdAt: new Date().toISOString(),
        career: 'sistemas',
        careerLabel: 'Ingeniería de Sistemas',
        job: 'fullstack',
        jobLabel: 'Full Stack Dev',
        currentSubscription: {
          planId: 'plan_admin',
          planName: 'Admin Unlimited',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          isTrial: false
        }
      };
      localStorage.setItem(this.usersStorageKey, JSON.stringify([defaultUser]));
      return [defaultUser];
    }
  }

  // 1. LOGIN: Adaptamos la firma para recibir un objeto (LoginRequest)
  async login(credentials: LoginRequest): Promise<User> {
    const users = await this.initializeUsers();

    // --- DEBUG LOGS
    console.log("Intentando login con:", credentials);
    console.log("Usuarios en base de datos:", users);


    // Buscamos coincidencia
    const dbUser = users.find(u => {
      const emailMatch = u.email === credentials.email;
      const passMatch = u.password === credentials.password;

      // Si el email coincide pero el password no, avísame
      if (emailMatch && !passMatch) {
        console.warn(`Usuario encontrado (${u.email}), pero password incorrecto.`);
        console.warn(`Esperaba: '${u.password}', Recibí: '${credentials.password}'`);
      }

      return emailMatch && passMatch;
    });

    if (!dbUser) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = `mock_token_${dbUser.id}_${Date.now()}`;
    localStorage.setItem(this.tokenKey, token);

    // Convertimos a usuario de dominio (sin password) y guardamos
    const userToReturn = this.mapToDomainUser(dbUser);
    localStorage.setItem(this.userKey, JSON.stringify(userToReturn));

    return userToReturn;
  }


  // 2. REGISTER: Adaptamos la firma para recibir un objeto (RegisterRequest)
  async register(data: RegisterRequest): Promise<User> {
    const users = await this.initializeUsers();

    if (users.find(u => u.email === data.email)) {
      throw new Error('Este correo ya está registrado');
    }

    // Lógica del plan Trial
    const trialSubscription = {
      planId: "plan_trial",
      planName: "Plan Trial",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      isTrial: true,
    };

    // Crear el usuario para la DB (con password)
    // NOTA: Asumimos que RegisterRequest no trae careerLabel/jobLabel por defecto,
    // o deberías agregarlos al RegisterRequest en 'endpoints.ts'.
    // Aquí los simulamos o los extraemos si vienen en 'data'.
    const newDbUser: MockDatabaseUser = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      role: 'user',
      displayName: data.first_name + ' ' + data.last_name, // O email.split
      career: data.career,
      careerLabel: 'Carrera Seleccionada', // Deberías pasar esto en data si lo tienes
      job: 'puesto_pendiente', // Deberías pasar esto en data
      jobLabel: 'Puesto Pendiente',
      createdAt: new Date().toISOString(),
      currentSubscription: trialSubscription,
    };

    users.push(newDbUser);
    localStorage.setItem(this.usersStorageKey, JSON.stringify(users));

    // Auto-login: llamamos a nuestro propio método login
    return await this.login({ email: data.email, password: data.password });
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    // Opcional: recargar página para limpiar estados de memoria
    window.location.href = '/login';
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 4. GET CURRENT USER: Devuelve User o null
  getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    if (!userData) return null;
    return JSON.parse(userData) as User;
  }




  // Verificar si el usuario actual es admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // 6. REFRESH TOKEN (Método requerido por la interfaz aunque aquí sea fake)
  async refreshToken(): Promise<User | null> {
    // 1. Simulamos un pequeño retraso de red (opcional, para realismo)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Verificamos si tenemos token y datos guardados
    if (!this.getToken() || !localStorage.getItem(this.userKey)) {
      return null;
    }

    // 3. En el Mock, confiamos en que si están en localStorage, son válidos.
    // En el Backend real, aquí harías: await apiClient.post('/auth/refresh')
    return this.getCurrentUser();
  }
}

export const mockAuthService = new MockAuthService();

