import { body } from "express-validator"


export const createPostValidation = [
  body("title", "Please add a title").isLength({ min: 3 }).isString(),
  body("text", "Please add text").isLength({ min: 10 }).isString(),
  body("tags", "Tags format not correct").optional().isString(),
  body("imageUrl", "Link not correct").optional().isString(),
]