# CRUD Workanda

Este proyecto es una API básica con autenticación que permite realizar operaciones CRUD sobre usuarios. La API está desarrollada en Node.js utilizando Express.js, y el frontend está implementado en Vue.js.

## Requisitos
- Node.js >= 14.x
- npm o yarn
- MySQL o MariaDB
- Vue CLI

## Preparación

- Edita los archivos .env con tus variables de entorno.
   
## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LucasMochi/crud-workanda
   ```

2. Prender el servidor de BACKEND:
   ```bash
   cd backend
   npm install
   npm run start
   ```
   
3. Prender el servidor de FRONTEND:
   ```bash
   cd frontend
   npm install
   npm run serve
   ```
4. Para ingresar al sistema, utiliza las siguientes credenciales de usuario:

   - **Correo electrónico**: `admin@admin.com`
   - **Contraseña**: `admin`

## Rutas de la API

### POST /login
**Descripción**: Permite a un usuario autenticarse.  
**Request**: `{ "email": "admin@admin.com", "password": "admin" }`  
**Response**: `{ "token": "eyJhbGciOiJIUzI1..." }`

### POST /logout
**Descripción**: Cierra la sesión del usuario autenticado.  
**Request**: `{ "token": "eyJhbGciOiJIUzI1..." }`  
**Response**: `{ "message": "Logout successful" }`

### POST /
**Descripción**: Crea un nuevo usuario (requiere token).  
**Request**: `{ "firstName": "Lucas", "lastName": "Mochi" "email": "lucas@example.com", "password": "123456" }`  
**Response**: `{ "id": 1, "firstName": "Lucas", "lastName": "Mochi" "email": "lucas@example.com" }`

### PUT /:id
**Descripción**: Actualiza los datos de un usuario existente (requiere token).  
**Request**: `{ "firstName": "Lucas", "lastName": "Mochi" "email": "lucas@example.com" }`  
**Response**: `{ "id": 1, "firstName": "Lucas", "lastName": "Mochi" "email": "lucas@example.com" }`

### GET /
**Descripción**: Obtiene la lista de usuarios (requiere token).  
**Request**: `No necesita parámetros en el cuerpo de la solicitud.`  
**Response**: `[ { "id": 1, "firstName": "Lucas", "lastName": "Mochi" "email": "lucas@example.com", "password": "$2b$10$KIXA1hJXv..." } { "id": 2, "firstName": "Lucas", "lastName": "Mochi" "email": "lucas@example.com", "password": "$2b$10$KIXA1hJXv..." } ]`

### DELETE /:id
**Descripción**: Elimina un usuario existente (requiere token).  
**Request**: `No necesita parámetros en el cuerpo de la solicitud.`  
**Response**: `{ "message": "User deleted successfully" }`

## Mejoras Futuras

- **Implementación de OAuth**: Se integrará OAuth para el manejo de autenticación, permitiendo un flujo más seguro y flexible mediante access tokens. Esto permitirá que los clientes (aplicaciones) puedan autenticarse y obtener tokens de acceso para interactuar con la API, mejorando la seguridad en la gestión de sesiones.

- **Manejo de Roles**: Se añadirá un sistema de roles, donde cada usuario será asignado a un rol específico (por ejemplo, administrador, editor, usuario básico). Dependiendo del rol, los usuarios podrán tener diferentes permisos para agregar, eliminar o modificar otros usuarios dentro de la plataforma.



