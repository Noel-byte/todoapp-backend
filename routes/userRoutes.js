import express from 'express'
import { registerUser } from '../controllers/userController.js'
import { loginUser } from '../controllers/userController.js'
import { getUser } from '../controllers/userController.js'


const router = express.Router()

router.post('/',registerUser)
router.post('/',loginUser)
router.post('/',getUser)

export default router