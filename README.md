# E-Commerce Project

Este proyecto consiste en una aplicación web de comercio electrónico dividida en dos partes principales: un backend desarrollado con Node.js y Express, y un frontend (en desarrollo).

## Estructura del Proyecto

```
Ecommerce/
├── ecommerce-backend/     # Servidor API REST
│   ├── prisma/            # Configuración y modelos de la base de datos
│   ├── src/               # Código fuente del backend
│   │   ├── app.js         # Configuración de Express
│   │   ├── server.js      # Punto de entrada de la aplicación
│   │   ├── config/        # Configuraciones adicionales
│   │   ├── controllers/   # Controladores para manejar las peticiones
│   │   ├── routes/        # Definición de rutas de la API
│   │   └── utils/         # Utilidades y funciones auxiliares
│   └── package.json       # Dependencias del backend
├── ecommerce-frontend/    # Aplicación cliente (en desarrollo)
└── README.md              # Este archivo
```

## Backend

### Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express**: Framework web para Node.js
- **Prisma**: ORM (Object-Relational Mapping) para interactuar con la base de datos
- **PostgreSQL**: Sistema de gestión de bases de datos relacional

### Modelos de Datos

El sistema incluye los siguientes modelos:

- **User**: Usuarios del sistema (clientes y administradores)
- **Product**: Productos disponibles para la venta
- **Cart**: Carritos de compra de los usuarios
- **CartItem**: Ítems individuales en los carritos
- **Order**: Órdenes de compra realizadas
- **OrderItem**: Ítems individuales en las órdenes

### Instalación del Backend

1. Clona este repositorio:
   ```
   git clone <url-del-repositorio>
   ```

2. Navega al directorio del backend:
   ```
   cd ecommerce-backend
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Configura la variable de entorno en un archivo `.env`:
   ```
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"
   ```

5. Ejecuta las migraciones de Prisma:
   ```
   npx prisma migrate dev
   ```

6. Inicia el servidor:
   ```
   npm start
   ```

## Frontend

La parte frontend del proyecto está en desarrollo.

## Características Principales

- Gestión de usuarios (registro, inicio de sesión)
- Catálogo de productos
- Gestión de carritos de compra
- Proceso de checkout
- Historial de órdenes

## Próximos Pasos

- Implementar el frontend
- Añadir sistema de pagos
- Implementar búsqueda y filtrado de productos
- Añadir sistema de reviews de productos
- Implementar panel de administración


# COMANDOS
- VISUALIZAR BD EN PRISMA
npx prisma studio

- CORRER BACKEND
   cd .\ecommerce-backend\
   npm start

# .ENV
´´´
DATABASE_URL="postgresql://postgres.gzlisqtvsibxuppqpjdw:password@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

´´´

## Licencia

ISC

---

Proyecto desarrollado para el curso de Calidad de Software.
