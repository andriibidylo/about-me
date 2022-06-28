import express, { json } from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {validationResult} from "express-validator"
import {registerValidation} from "./validations/auth.js"



const app = express()

mongoose.connect("mongodb+srv://Andrew:CaFMA3g6N8mFmgPo@cluster0.kjby4.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("DB connected"))
.catch((err)=> console.log("DB error"+err))

app.use(express.json())

app.get("/",(req, res)=> {
  res.send("Hello")
})
app.post("/auth/register",registerValidation,(req, res)=> {
const errors = validationResult(req)
if (!errors.isEmpty()){
  return res.status(400).json(errors.array())
}

res.json({
  success: true,
})
//  const token = jwt.sign({
//    email: req.body.email,
//    fullName: req.body.name
//  }, "secretkey") 
})

app.listen(8000, (err)=>{
  if (err) {
    console.log("Server error")
  }
  console.log("Server is running!")
})