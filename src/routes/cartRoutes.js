// src/routes/cartRoutes.js
import express from 'express'
import { 
    getCarts, 
    getCartById, 
    createCart, 
    updateCart, 
    deleteCart 
} from '../controllers/cartController.js'

const router = express.Router()

// Routes
router.get('/', getCarts)
router.get('/:id', getCartById)
router.post('/', createCart)
router.put('/:id', updateCart)
router.delete('/:id', deleteCart)

export default router
