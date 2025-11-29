# WhatSkills Frontend

Plataforma de gestión de habilidades y empleabilidad para estudiantes y profesionales. Este proyecto es el frontend de la aplicación WhatSkills, desarrollado con React, TypeScript y Vite.

## 🚀 Características Principales

- **Dashboard Interactivo**: Visualización de métricas de empleabilidad y progreso.
- **Gestión de Habilidades**: Añadir, evaluar y visualizar brechas de habilidades.
- **Planes de Aprendizaje**: Seguimiento de cursos y objetivos de aprendizaje.
- **Roles de Usuario**:
  - **Administrador**: Gestión de usuarios, planes y configuración global.
  - **Usuario**: Gestión de perfil, habilidades y objetivos personales.
- **Gráficos**: Visualización de datos con Recharts.
- **Autenticación**: Sistema de login simulado (Mock Auth) para desarrollo y pruebas.

## 🛠️ Tecnologías Utilizadas

- **Core**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Estilos**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Infraestructura**: Docker, Nginx

## 📋 Prerrequisitos

- Node.js (v18 o superior recomendado)
- npm o yarn

## 🔧 Instalación y Configuración Local

1. **Clonar el repositorio**
   `ash
   git clone <url-del-repositorio>
   cd what-skills-frontend
   `

2. **Instalar dependencias**
   `ash
   npm install
   `

3. **Ejecutar servidor de desarrollo**
   `ash
   npm run dev
   `
   La aplicación estará disponible en http://localhost:5173 (o el puerto que indique Vite).

## 🔑 Credenciales de Prueba

El proyecto utiliza un sistema de autenticación simulado (MockAuthService) que lee usuarios desde public/users.json. Puedes usar las siguientes cuentas para probar los diferentes roles:

| Rol | Email | Contraseña |
|-----|-------|------------|
| **Administrador** | dmin@whatskills.com | 123456 |
| **Usuario** | demo@unmsm.edu.pe | demo123 |

## 🐳 Ejecución con Docker

El proyecto incluye configuración para desplegarse en un contenedor Docker servido por Nginx.

1. **Construir la imagen**
   `ash
   docker build -t what-skills-frontend .
   `

2. **Correr el contenedor**
   `ash
   docker run -p 8080:80 what-skills-frontend
   `
   La aplicación estará disponible en http://localhost:8080.

## 📂 Estructura del Proyecto

`
src/
├── api/            # Configuración de llamadas a API
├── assets/         # Recursos estáticos (imágenes, fuentes)
├── common/         # Componentes comunes (Layouts, Sidebar, Navbar)
├── components/     # Componentes reutilizables UI (Inputs, Modales, Cards)
├── context/        # Contextos de React (Estado global)
├── pages/          # Vistas principales de la aplicación
│   ├── admin/      # Vistas de administrador
│   ├── dashboard/  # Vista principal
│   ├── login/      # Autenticación
│   ├── profile/    # Perfil de usuario
│   └── ...
├── services/       # Lógica de negocio y servicios (Auth, etc.)
├── types.ts        # Definiciones de tipos TypeScript globales
└── utils/          # Funciones de utilidad
`

## 📜 Scripts Disponibles

- 
pm run dev: Inicia el servidor de desarrollo.
- 
pm run build: Compila la aplicación para producción.
- 
pm run preview: Vista previa de la build de producción localmente.
- 
pm run lint: Ejecuta el linter para verificar calidad de código.
