import express from 'express'
import { 
    getCartItems, 
    getCartItemById, 
    createCartItem, 
    updateCartItem, 
    deleteCartItem 
} from '../controllers/cartItemController.js'

const router = express.Router()

// Routes
router.get('/', getCartItems)
router.get('/:id', getCartItemById)
router.post('/', createCartItem)
router.put('/:id', updateCartItem)
router.delete('/:id', deleteCartItem)

export default router
