// src/controllers/cartItemController.js
import prisma from '../config/prisma.js'

// Get all cart items
export const getCartItems = async (req, res) => {
    try {
        const items = await prisma.cartItem.findMany({
            include: {
                cart: true,
                product: true
            }
        })
        res.json({ success: true, data: items })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get cart item by ID
export const getCartItemById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const item = await prisma.cartItem.findUnique({
            where: { id },
            include: {
                cart: true,
                product: true
            }
        })
        if (!item) return res.status(404).json({ error: 'Cart item not found' })
        res.json({ success: true, data: item })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a cart item
export const createCartItem = async (req, res) => {
    try {
        const { cartId, productId, quantity } = req.body
        const newItem = await prisma.cartItem.create({
            data: { cartId, productId, quantity }
        })
        res.status(201).json({ success: true, data: newItem })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update a cart item
export const updateCartItem = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { quantity } = req.body
        const updated = await prisma.cartItem.update({
            where: { id },
            data: { quantity }
        })
        res.json({ success: true, data: updated })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a cart item
export const deleteCartItem = async (req, res) => {
    try {
        const id = Number(req.params.id)
        await prisma.cartItem.delete({ where: { id } })
        res.json({ success: true, message: 'Cart item deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
