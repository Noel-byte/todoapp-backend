import express from 'express';
import {
  createTodo,
  filterTodo,
  deleteTodo,
  updateTodo,
  deleteAll,
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// POST api/todos  -- create new task
router.post('/', protect, createTodo);

//GET  api/todos -- filter todos
router.get('/:status', protect, filterTodo);

//DELETE api/todos -- delete todos
router.delete('/:id', protect, deleteTodo);

//PUT api/todos -- update todos
router.put('/:id', protect, updateTodo);

//DELETE   api/todos -- delete all todos
router.delete('/user/:userid', protect, deleteAll);

//GET  api/user -- get a user
router.get('/:userId',async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
