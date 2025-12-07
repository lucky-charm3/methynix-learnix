const express=require('express');
const cors=require('cors');

const errorHandler=require('./middlewares/errorHandler.js');
const loggingMiddleware=require('./middlewares/loggingMiddleware');
const rateLimiter=require('./middlewares/rateLimiter')

const dbConnect=require('./config/dbConnect.js');
const dotenv=require('dotenv');

const authRouter=require('./routers/authRouter');
const userRouter=require('./routers/userRouter');
const lessonRouter=require('./routers/lessonRouter');
const courseRouter=require('./routers/courseRouter');

const app=express();

dotenv.config();

dbConnect();

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());

app.use(loggingMiddleware);

app.use(rateLimiter)

app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/lessons',lessonRouter);
app.use('/api/courses',courseRouter)

app.use(errorHandler);

const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Server running at http://localhost:${process.env.PORT}`))



