import type { User } from "../types/domain/User";

// Definimos interfaz para cuando tengas backend
export interface IUserService {
  getAllUsers(): Promise<User[]>;
  // Aquí irían deleteUser, updateUser, etc.
}

class MockUserService implements IUserService {
  private usersStorageKey = 'mockUsers';

  async getAllUsers(): Promise<User[]> {
    // Leemos del MISMO lugar que Auth, porque comparten la "Base de datos" (localStorage)
    const storedUsers = localStorage.getItem(this.usersStorageKey);
    if (!storedUsers) return [];
    
    const dbUsers = JSON.parse(storedUsers);
    
    // Importante: No devolver passwords, limpiamos los datos
    // (Simulando lo que haría el backend real)
    return dbUsers.map((u: User & { password: string }) => {
        const { password, ...cleanUser } = u;
        return cleanUser as User;
    });
  }
}

export const userService = new MockUserService();