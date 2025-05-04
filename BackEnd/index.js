import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utilities/database.js';
import userRouter from './routes/UserRoutes.js';
import companyRouter from './routes/CompanyRouter.js';
import jobRouter from './routes/JobRoutes.js';
import applicationRouter from './routes/ApplicationRouter.js';

dotenv.config();

const app = express();
const port = process.env.Port || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const  corOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true
// }
// app.use(cors(corOptions))

// ✅ Corrected CORS setup
const allowedOrigins = [
  'https://naukirilelo-frontend.onrender.com',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: Origin ${origin} not allowed`));
    }
  },
  credentials: true
}));

// Routes
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/job', jobRouter);
app.use('/application', applicationRouter);

// Server Start
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
