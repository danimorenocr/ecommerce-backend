// src/controllers/orderController.js
import prisma from "../config/prisma.js";

// 📌 Obtener todas las órdenes
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: { include: { product: true } },
        payments: true,
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Obtener una orden por ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        items: { include: { product: true } },
        payments: true,
      },
    });
    if (!order) return res.status(404).json({ error: "Orden no encontrada" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Crear una nueva orden
export const createOrder = async (req, res) => {
  try {
    const { userId, items, total, address, city, phone, notes } = req.body;

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        address,
        city,
        phone,
        notes,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Actualizar estado o datos de envío de una orden
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, address, city, phone, notes } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        status,
        address,
        city,
        phone,
        notes,
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Eliminar una orden
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
