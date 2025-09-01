import prisma from '../config/prisma.js'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


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

        // Hashear la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: { 
                name, 
                email, 
                password: hashedPassword, 
                role: role || 'USER' // Valor por defecto
            }
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
        
        // Preparar datos para actualización
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        
        // Si hay contraseña, hacer hash
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData
        })

        res.json({ success: true, data: updatedUser })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(401).json({ error: 'Invalid credentials' })

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' })

        // No incluir la contraseña en el token ni en la respuesta
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        )

        res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
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
