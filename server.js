import express from 'express'; //Web framework for Node.js to create API routes
import mongoose from 'mongoose'; //ODM(Object Data Modeling) library for MongoDB and Node.js
import cors from 'cors'; //middleware to enable cross-origin resource sharing
import dotenv from 'dotenv'; //loads environment variables from a .env file into process.env
import todoRoutes from './routes/todoRoutes.js'; //route handler for /api/todos
import userRoutes from './routes/userRoutes.js' //route handler for /api/users


dotenv.config();

const app = express(); //app is your express application instance used to define routes and middleware


//middleware
// app.use(cors({
//   origin:'http://localhost:5174',
// }));
// app.use(cors({ origin: ['http://localhost:5173', 'https://todofrontapp.netlify.app'] }));

/*
origin:specifies which front-end URLs are allowed to interact with the backend (CORS policy)
credentials:true: allows cookies or authorization headers to be sent with requests
this setup allows requests only form your development frontend and deployed frontend(Netlify)

*/
const allowedOrigins = ['http://localhost:5173', 'https://todofrontapp.netlify.app'];


app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));

/*
parse incoming JSON requests bodies and makes them avaialable as req.body

*/

app.use(express.json());

/*
  Mounts the todo and user routers on their respective paths
  example: a POST  to /api/todos will be handled by todoRoutes.js

*/
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

//handlers - routing

app.get('/', (req, res) => {
  res.send('Welcome To The ToDo-List App!');
});

/**
 * connectes to MongoDB using Mongoose
 * only after a successful connection does the server start listening on the specified port (PORT form .env or fallback to 5000)
 */

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`server running on port ${process.env.PORT || 5000}`)
  );
});
