// src/app.js
import express from "express"
import cors from "cors"

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import cartItemRoutes from "./routes/cartItemRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import orderItemRoutes from "./routes/orderItemRoutes.js"

const app = express()
const PORT = process.env.PORT || 4000

// 🔹 Configuración de CORS
const allowedOrigins = [
  "http://localhost:3000",   // frontend local
  "http://localhost:5000",   // otro puerto local
  "https://mi-tienda.com"    // dominio real en producción
]

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (ej: Postman) o si está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  }
}))

// Middlewares
app.use(express.json())

// 🔹 Rutas
app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/carts", cartRoutes)
app.use("/cart-items", cartItemRoutes)
app.use("/orders", orderRoutes)
app.use("/order-items", orderItemRoutes)

// Server
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
})