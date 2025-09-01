import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Rutas de órdenes
router.get("/", getOrders);        // Obtener todas las órdenes
router.get("/:id", getOrderById);  // Obtener una orden por ID
router.post("/", createOrder);     // Crear nueva orden
router.put("/:id", updateOrder);   // Actualizar orden
router.delete("/:id", deleteOrder); // Eliminar orden

export default router;
