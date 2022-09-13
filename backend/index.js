import cors from 'cors'
import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import comicRouter from "./routes/comicRoutes.js";
import postRouter from './routes/postRoutes.js'




const app = express();
dotenv.config()
connectDB()
app.use(express.json())

 //configurar Cors
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true);
        }else {
            callback(new Error ('Error de CORS'))
        }
    }
};

app.use(cors(corsOptions));


//Routing
app.use('/api/users', userRouter)
app.use('/api/comics', comicRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT), () => {
    console.log("hello")
}
