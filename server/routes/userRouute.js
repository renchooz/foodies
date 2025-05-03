import express from "express"
import { login, userData } from "../controller/userController.js"
const UserRouter = express.Router()

UserRouter.post("/register",userData)
UserRouter.post("/login",login)


export default UserRouter