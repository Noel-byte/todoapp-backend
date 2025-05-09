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
        email,
        password:hashedPassword,
    })

   if(user){
    res.status(201).json({
        _id:user.id,
        email:user.email,
        token:generateToken(user._id)
    })
   }else{
    res.status(400)
    throw new Error('Invalid user data')
   }
    
})

//@desc Authenticaate a user
//@route   POST /api/login
//@access Public
export const loginUser = asyncHandler( async (req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
        email:user.email,
        token:generateToken(user._id)

        })
    }else{
        res.status(400)
    throw new Error('Invalid credentials')
    }
    
    
})

//@desc  Get user data
//@route   GET /api/users/me
//@access Private
export const getUser = asyncHandler(async (req,res)=>{
    
   const {_id,email} = await User.findById(req.User.id)

   res.status(200).json({
    id:_id,
    email,
   })
    
})


//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

