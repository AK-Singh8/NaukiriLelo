import express from 'express';
import cookieParser from 'cookie-parser'; //will be used to parse cookies
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utilities/database.js';
import userRouter from './routes/UserRoutes.js';
import companyRouter from './routes/CompanyRouter.js';
import jobRouter from './routes/JobRoutes.js'
import applicationRouter from './routes/ApplicationRouter.js'

dotenv.config({});

const app = express()
const port = process.env.Port || 3000

app.use(express.json())//from here
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// const  corOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true
// }
const  corOptions = {
    origin: 'https://naukirilelo-backend-pjsv.onrender.com',
    credentials: true
}
app.use(cors(corOptions))//to here
//above lines always mostly used in backend

app.use("/user",userRouter);
app.use("/company",companyRouter);
app.use("/job",jobRouter);
app.use("/application",applicationRouter);



app.listen(port, () => {
    connectDB();
    console.log(`Server running at ${port}`)
})