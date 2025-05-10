import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import Todo from '../models/Todo.js';

export const createTodo = asyncHandler(async (req, res) => {

  const newTask = new Todo({ text: req.body.text,user:req.user.id }); //create new task
  const saveTask = await newTask.save();

  if (saveTask) {
    res.status(201).json(saveTask);
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

export const filterTodo = asyncHandler(async (req, res) => {
    console.log(req.user.id)
  let query = {user:req.user.id};

  const { status } = req.params;
 console.log(status)


  if (!status) {
    res.status(400);
    throw new Error('Could not retrieve todos');
  }

  if (status === 'complete') {
    query.completed = true;
  } else if (status === 'incomplete') {
    query.completed = false;
  }
  const todos = await Todo.find(query); //retrieve all documents based on the query
  res.status(200).json(todos); //send them back as json
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error('could not delete item');
  }
  await Todo.findByIdAndDelete(id);
  res.status(200).json({ message: 'item deleted successfully' });
});

export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error('could not update todo');
  }
  await Todo.findByIdAndUpdate(id, req.body);
  res.status(200).json({ message: 'updated successfully' });
});

// export const deleteAll = asyncHandler(async (req, res) => {
//   if (await Todo.deleteMany({})) {
//     res.status(200).json({ message: 'tasks cleared' });
//   } else {
//     res.status(400);
//     throw new Error('could not clear');
//   }
// });
