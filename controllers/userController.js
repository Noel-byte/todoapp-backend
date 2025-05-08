import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

//@desc Register new user
//@route   POST /api/users
//@access Public

export const registerUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body

    if(!email||!password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const user = await  User.create({
        email,password:hashedPassword
    })

   if(user){
    res.status(201).json({
        id:user._id,
        email:user.email
    })
   }else{
    res.status(400)
    throw new Error('Invalid user data')
   }
    res.json({message:'Register user'})
    
})

//@desc Authenticaate a user
//@route   POST /api/login
//@access Public
export const loginUser =asyncHandler( async (req,res)=>{
    
    res.json({message:'Login user'})
    
})

//@desc  Get user data
//@route   GET /api/users/me
//@access Public
export const getUser = asyncHandler(async (req,res)=>{
    
    res.json({message:'get user'})
    
})

