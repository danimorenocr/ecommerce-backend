// src/controllers/orderController.js
import prisma from '../config/prisma.js'

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                items: { include: { product: true } }
            }
        })
        res.json({ success: true, data: orders })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
                items: { include: { product: true } }
            }
        })
        if (!order) return res.status(404).json({ error: 'Order not found' })
        res.json({ success: true, data: order })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create an order
export const createOrder = async (req, res) => {
    try {
        const { userId, total, status, items } = req.body
        const newOrder = await prisma.order.create({
            data: {
                userId,
                total,
                status,
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: { items: true }
        })
        res.status(201).json({ success: true, data: newOrder })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update an order
export const updateOrder = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { status } = req.body
        const updated = await prisma.order.update({
            where: { id },
            data: { status }
        })
        res.json({ success: true, data: updated })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        const id = Number(req.params.id)
        await prisma.order.delete({ where: { id } })
        res.json({ success: true, message: 'Order deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
 