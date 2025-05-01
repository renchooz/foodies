import express from "express"
import { userData } from "../controller/userController.js"
const UserRouter = express.Router()

UserRouter.post("/register",userData)

export default UserRouter