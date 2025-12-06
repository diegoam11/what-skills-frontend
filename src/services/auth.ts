import { mockAuthService } from "./mockAuthService";
import { apiAuthService } from "./apiAuthService"; // lo crearemos cuando tengamos backend
import type { IAuthService } from "./IAuthService";

// Variable de entorno para decidir qué usar
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'false';

// Aquí decides qué implementación exportar
export const authService: IAuthService = USE_MOCK 
  ? mockAuthService 
  : apiAuthService; 