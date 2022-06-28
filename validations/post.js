import {body} from "express-validator"


export const CreatePostValidation = [
  body("title", "Please add a title").isLength({min:3}).isString(),
  body("text", "Please add text").isLength({min:10}).isString(),
  body("tags", "Tags format not correct").optional().isArray(),
  body("imageUrl", "Link not correct").optional().isURL(),
]