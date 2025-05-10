import express from 'express'
import { createTodo,filterTodo,deleteTodo,updateTodo,deleteAll} from '../controllers/todoController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


// POST api/todos  -- create new task
router.post('/',protect,createTodo)

//GET  api/todos -- filter todos
router.get('/:status',protect,filterTodo)

//DELETE api/todos -- delete todos
router.delete('/:id',protect,deleteTodo)

//PUT api/todos -- update todos
router.put('/:id',protect,updateTodo)

//DELETE   api/todos -- delete all todos
router.delete('/:userid',protect,deleteAll)

export default router