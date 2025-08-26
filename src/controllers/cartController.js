import prisma from '../config/prisma.js'
import { Prisma } from '@prisma/client'

// Get all carts
export const getCarts = async (req, res) => {
    try {
        const carts = await prisma.cart.findMany({
            include: {
                user: true,
                items: true
            }
        })
        res.json({ success: true, data: carts })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get cart by ID
export const getCartById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid cart ID' })

        const cart = await prisma.cart.findUnique({
            where: { id },
            include: {
                user: true,
                items: true
            }
        })

        if (!cart) return res.status(404).json({ error: 'Cart not found' })
        res.json({ success: true, data: cart })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new cart
export const createCart = async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' })
        }

        const newCart = await prisma.cart.create({
            data: { userId },
            include: { user: true, items: true }
        })

        res.status(201).json({ success: true, data: newCart })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update a cart (e.g. change userId)
export const updateCart = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid cart ID' })

        const { userId } = req.body

        const updatedCart = await prisma.cart.update({
            where: { id },
            data: { userId },
            include: { user: true, items: true }
        })

        res.json({ success: true, data: updatedCart })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a cart
export const deleteCart = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid cart ID' })

        await prisma.cart.delete({
            where: { id }
        })

        res.json({ success: true, message: 'Cart successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
