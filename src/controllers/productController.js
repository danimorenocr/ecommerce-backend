import prisma from '../config/prisma.js'

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany()
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        })
        if (!product) return res.status(404).json({ error: 'Product not found' })
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl, createdById } = req.body
        const newProduct = await prisma.product.create({
            data: { name, description, price, stock, imageUrl, createdById }
        })
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, price, stock, imageUrl } = req.body
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, description, price, stock, imageUrl }
        })
        res.json(updatedProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        await prisma.product.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.json({ message: 'Product successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
