import express, { json } from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { validationResult } from "express-validator"
import { registerValidation } from "./validations/auth.js"
import UserModel from "./models/User.js"
import bcrypt from 'bcrypt'
import checkAuth from "./utils/checkAuth.js"
import User from "./models/User.js"

const app = express()

mongoose.connect("mongodb+srv://Andrew:CaFMA3g6N8mFmgPo@cluster0.kjby4.mongodb.net/?retryWrites=true&w=majority")
  .then(console.log("DB connected"))
  .catch((err) => console.log("DB error" + err))

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello")
})
app.post("/auth/register", registerValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);



    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });
    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id
    }, "secretkey", {
      expiresIn: "20min"
    })
    const { passwordHash, ...userData } = user._doc
    res.json({
      ...userData,
      token
    })

  } catch (err) {
    console.log(err)
    res.status(500)
    res.json({ message: "We could not register you" })
  }
})

app.post("/auth/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if (!isValidPassword) {
      return res.status(400).json({ message: "Wrong email or password" })
    }
    const token = jwt.sign({
      _id: user._id
    }, "secretkey", {
      expiresIn: "20min"
    })
    const { passwordHash, ...userData } = user._doc
    res.json({
      ...userData,
      token
    })

  } catch (error) {
    console.log(err)
    res.status(500)
    res.json({ message: "Authorization error" })
  }
})

app.get("/auth/me", async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const { passwordHash, ...userData } = user._doc
    res.json({
      ...userData
    })
  } catch (error) {
    console.log(err)
    res.status(404)
    res.json({ message: "Access denied" })
  }
})
app.listen(8000, (err) => {
  if (err) {
    console.log("Server error")
  }
  console.log("Server is running!")
})