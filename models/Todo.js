import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User',
  // },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

export default mongoose.model('Todo', todoSchema);
