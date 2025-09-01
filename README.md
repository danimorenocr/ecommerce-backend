# E-Commerce Backend API Documentation

This document provides comprehensive documentation for the e-commerce backend API endpoints to be used by the frontend.

## Base URL

```
http://localhost:4000/api
```

## Authentication

*Authentication endpoints and implementation details will be added in future versions.*

## API Endpoints Reference

### Users

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/users` | Get all users | - | Array of user objects |
| `GET` | `/api/users/:id` | Get user by ID | - | Single user object |
| `POST` | `/api/users` | Create new user | `{ name, email, password, role }` | Created user object |
| `PUT` | `/api/users/:id` | Update user | `{ name?, email?, password?, role? }` | Updated user object |
| `DELETE` | `/api/users/:id` | Delete user | - | Success message |

### Products

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/products` | Get all products | - | Array of product objects |
| `GET` | `/api/products/:id` | Get product by ID | - | Single product object |
| `POST` | `/api/products` | Create new product | `{ name, description, price, stock, imageUrl, createdById }` | Created product object |
| `PUT` | `/api/products/:id` | Update product | `{ name?, description?, price?, stock?, imageUrl? }` | Updated product object |
| `DELETE` | `/api/products/:id` | Delete product | - | Success message |

### Carts

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/carts` | Get all carts | - | Array of cart objects |
| `GET` | `/api/carts/:id` | Get cart by ID | - | Single cart object with items |
| `POST` | `/api/carts` | Create new cart | `{ userId }` | Created cart object |
| `PUT` | `/api/carts/:id` | Update cart | `{ userId? }` | Updated cart object |
| `DELETE` | `/api/carts/:id` | Delete cart | - | Success message |

### Cart Items

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/cart-items` | Get all cart items | - | Array of cart item objects |
| `GET` | `/api/cart-items/:id` | Get cart item by ID | - | Single cart item object |
| `POST` | `/api/cart-items` | Add item to cart | `{ cartId, productId, quantity }` | Created cart item object |
| `PUT` | `/api/cart-items/:id` | Update cart item | `{ quantity? }` | Updated cart item object |
| `DELETE` | `/api/cart-items/:id` | Remove item from cart | - | Success message |

### Orders

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/orders` | Get all orders | - | Array of order objects |
| `GET` | `/api/orders/:id` | Get order by ID | - | Single order object with items |
| `POST` | `/api/orders` | Create new order | `{ userId, total, status, address, city, phone, notes? }` | Created order object |
| `PUT` | `/api/orders/:id` | Update order | `{ status?, address?, city?, phone?, notes? }` | Updated order object |
| `DELETE` | `/api/orders/:id` | Delete order | - | Success message |

### Order Items

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/order-items` | Get all order items | - | Array of order item objects |
| `GET` | `/api/order-items/:id` | Get order item by ID | - | Single order item object |
| `POST` | `/api/order-items` | Add item to order | `{ orderId, productId, quantity, price }` | Created order item object |
| `PUT` | `/api/order-items/:id` | Update order item | `{ quantity?, price? }` | Updated order item object |
| `DELETE` | `/api/order-items/:id` | Remove item from order | - | Success message |

### Payments

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/payments` | Get all payments | - | Array of payment objects |
| `GET` | `/api/payments/:id` | Get payment by ID | - | Single payment object |
| `POST` | `/api/payments` | Create new payment | `{ mpPaymentId, status, statusDetail, amount, currency, payerEmail, orderId }` | Created payment object |
| `PUT` | `/api/payments/:id` | Update payment | `{ status?, statusDetail? }` | Updated payment object |
| `DELETE` | `/api/payments/:id` | Delete payment | - | Success message |

## Request & Response Examples

### Example: Creating a new product

**Request:**
```http
POST /api/products
Content-Type: application/json

{
  "name": "Smartphone XYZ",
  "description": "Latest model with advanced features",
  "price": 699.99,
  "stock": 50,
  "imageUrl": "https://example.com/images/smartphone-xyz.jpg",
  "createdById": 1
}
```

**Response:**
```json
{
  "id": 12,
  "name": "Smartphone XYZ",
  "description": "Latest model with advanced features",
  "price": 699.99,
  "stock": 50,
  "imageUrl": "https://example.com/images/smartphone-xyz.jpg",
  "createdAt": "2025-08-26T10:30:00.000Z",
  "updatedAt": "2025-08-26T10:30:00.000Z",
  "createdById": 1
}
```

### Example: Adding an item to cart

**Request:**
```http
POST /api/cart-items
Content-Type: application/json

{
  "cartId": 3,
  "productId": 12,
  "quantity": 2
}
```

**Response:**
```json
{
  "id": 45,
  "cartId": 3,
  "productId": 12,
  "quantity": 2
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK`: The request was successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request or validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

Error responses include a message field with details about the error.

## Development Commands

```bash
# Start development server
npm run dev

# Run Prisma migrations
npx prisma migrate dev

# View database with Prisma Studio
npx prisma studio
```

## Database Schema

The complete database schema is defined in `prisma/schema.prisma`. It includes the following models:
- User
- Product
- Cart
- CartItem
- Order
- OrderItem
- Payment

For detailed schema information, refer to the Prisma schema file.
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
