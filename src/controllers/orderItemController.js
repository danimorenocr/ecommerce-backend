// src/controllers/orderItemController.js
import prisma from '../config/prisma.js'

// Get all order items
export const getOrderItems = async (req, res) => {
    try {
        const items = await prisma.orderItem.findMany({
            include: {
                order: true,
                product: true
            }
        })
        res.json({ success: true, data: items })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get order item by ID
export const getOrderItemById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const item = await prisma.orderItem.findUnique({
            where: { id },
            include: {
                order: true,
                product: true
            }
        })
        if (!item) return res.status(404).json({ error: 'Order item not found' })
        res.json({ success: true, data: item })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create an order item
export const createOrderItem = async (req, res) => {
    try {
        const { orderId, productId, quantity, price } = req.body
        const newItem = await prisma.orderItem.create({
            data: { orderId, productId, quantity, price }
        })
        res.status(201).json({ success: true, data: newItem })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update an order item
export const updateOrderItem = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { quantity, price } = req.body
        const updated = await prisma.orderItem.update({
            where: { id },
            data: { quantity, price }
        })
        res.json({ success: true, data: updated })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete an order item
export const deleteOrderItem = async (req, res) => {
    try {
        const id = Number(req.params.id)
        await prisma.orderItem.delete({ where: { id } })
        res.json({ success: true, message: 'Order item deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
