import prisma from '../config/prisma.js'
import { Prisma } from '@prisma/client'

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                carts: true,
                orders: true,
                products: true
            }
        })
        res.json({ success: true, data: users })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID' })

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                carts: true,
                orders: true,
                products: true
            }
        })

        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json({ success: true, data: user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' })
        }

        const newUser = await prisma.user.create({
            data: { name, email, password, role }
        })

        res.status(201).json({ success: true, data: newUser })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({ error: 'Email already exists' })
            }
        }
        res.status(500).json({ error: error.message })
    }
}

// Update a user
export const updateUser = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID' })

        const { name, email, password, role } = req.body

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email, password, role }
        })

        res.json({ success: true, data: updatedUser })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID' })

        await prisma.user.delete({
            where: { id }
        })

        res.json({ success: true, message: 'User successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
