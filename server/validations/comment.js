import { body } from "express-validator"


export const createCommentValidation = [
  body("text", "Please add text").isLength({ min: 2 }).isString(),
]