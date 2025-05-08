import express from 'express'


const router = express.Router()
const {registerUser} = require('../controllers/userController')

router.post('/',registerUser)

module.exports=router