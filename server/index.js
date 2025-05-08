import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import connectDb from "./config/db.js"
import "dotenv/config"
import UserRouter from "./routes/userRouute.js"
import sellerRoute from "./routes/sellerRouter.js"
import connectCloudinary from "./config/cloudinary.js"
import productRoute from "./routes/productRoute.js"
let app = express()
let port = process.env.PORT || 4000
await connectDb()
await connectCloudinary()
//middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("Api Working")
})
app.use("/api/user",UserRouter)
app.use("/api/seller",sellerRoute)
app.use("/api/product",productRoute)

app.listen(port,()=>{
    console.log(`api is running on ${port}`)
})