import express from 'express'
import Todo from '../models/Todo.js'
import { createTodo,filterTodo,deleteTodo,updateTodo, deleteAll } from '../controllers/todoController.js'

const router = express.Router()


// POST api/todos  -- create new task
router.post('/',createTodo)

//GET  api/todos -- filter todos
router.get('/:status',filterTodo)

//DELETE api/todos -- delete todos
router.delete('/:id',deleteTodo)

//PUT api/todos -- update todos
router.put('/:id',updateTodo)

//DELETE   api/todos -- delete all todos
router.delete('/',deleteAll)

export default router