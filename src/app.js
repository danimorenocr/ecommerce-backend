import express from "express";
import cors from "cors";
import productoRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// 🔹 Configuración de CORS
const allowedOrigins = [
  "http://localhost:3000",   // frontend local
  "http://localhost:5000",   // si lo sirves con otro puerto
  "https://mi-tienda.com"    // dominio real en producción
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (ej: Postman) o si está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// Middlewares
app.use(express.json());

// Routes
app.use("/products", productoRoutes);
app.use("/users", userRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
