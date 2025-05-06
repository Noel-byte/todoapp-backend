import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRouter.js';

dotenv.config();

const app = express();

//middleware
app.use(cors()); //enables cross-origin requests (cors - cross-origin resource sharing)

app.use(express.json());

//mounting routers
app.use('/api/todos', todoRoutes);

//handlers - routing

app.get('/', (req, res) => {
  res.send('Welcome To The ToDo-List App!');
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`server running on port ${process.env.PORT || 5000}`)
  );
});
