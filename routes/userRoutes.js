import express from 'express'
import { registerUser,loginUser,getUser ,getUserById} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',registerUser)
router.post('/login',loginUser)
// router.get('/user',protect,getUser)
router.get('/profile',protect,getUserById)

export default router