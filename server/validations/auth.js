import { body } from "express-validator"


export const registerValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  body("fullName", "Full name must be at least 3 characters").isLength({ min: 3 }),
  body("avatartUrl", "Wrong avatar ull").optional().isURL(),
]

export const loginValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
]