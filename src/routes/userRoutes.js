import express from 'express'
import { 
    getUsers, 
    getUserById, 
    createUser,
    loginUser,
    updateUser, 
    deleteUser 
} from '../controllers/userController.js'

const router = express.Router()

// Routes
router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.post('/login', loginUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
