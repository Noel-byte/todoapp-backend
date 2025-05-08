import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import Todo from '../models/Todo.js'

export const createTodo =  asyncHandler ( async (req,res)=>{
    const {text} = req.body
    const newTask = new Todo({text}) //create new task
    const saveTask = await newTask.save()

    if(saveTask){
        res.status(201).json(saveTask)
    }else{
        res.status(400)
        throw new error ('Invalid data')
    }
 
})