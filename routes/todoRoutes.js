import express from 'express'
import Todo from '../models/Todo.js'

const router = express.Router()

// POST api/todos  -- create new task
router.post('/', async (req,res)=>{

    try{
        const {text} = req.body
        const newTask = new Todo({text}) //create new task
        const saveTask = await newTask.save()
        res.status(201).json(saveTask)
    }catch(err){
        res.status(500).json({error:'Failed to add task'})
    }
  
})

router.get('/:status',async(req,res)=>{
    let query ={}
    try{
        const{status} = req.params
        if(status==='complete'){
            query.completed=true
        }
       else if(status==='incomplete'){
            query.completed=false
        }
        const todos = await Todo.find(query); //retrieve all documents based on the query
        res.status(200).json(todos) //send them back as json
    }catch(error){
        console.error('Error fetching todos:', error)
        res.status(500).json({message:'Server Error: could not retrieve todos'})
    }
    
})

router.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params
        await Todo.findByIdAndDelete(id)
        res.status(200).json({message:'item deleted successfully'})
    }catch(error){
        console.error('error deleting item')
        res.status(500).json({message:'could not delete item'})
    }
   
})

router.put('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        await Todo.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:'updated successfully'})
    }catch(error){
        console.error('error updating item')
        res.status(500).json({message:'could not update item'})
    }
})

router.delete('/',async(req,res)=>{
    try{
        await Todo.deleteMany({})
        res.status(200).json({message:'tasks cleared'})
    }catch(error){
        res.status(500).json({message:'could not clear'})
    }
})

export default router