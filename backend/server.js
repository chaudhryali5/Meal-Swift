import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectdb } from './config/db.js'
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';
import contactRouter from './routes/contactRoute.js';

dotenv.config();

const app=express()
const port=process.env.PORT || 5000
const PREFIX = '/api/v1';

app.use(express.json())
app.use(cors())

connectdb();

app.use(PREFIX,foodRouter)
app.use("/images",express.static('uploads'))
app.use(PREFIX,userRouter)
app.use(PREFIX,cartRouter)
app.use(PREFIX,orderRouter)
app.use(PREFIX,contactRouter)


app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
    
})