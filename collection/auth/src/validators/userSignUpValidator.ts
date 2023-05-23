import { body } from "express-validator";

import { User } from "../models/user";

const userSignUpValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("email").custom(async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("E-mail already in use");
    }
  }),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
  body("username")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 characters without space"),
  body("username").custom(async (username) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("username already in use");
    }
  }),
];

export { userSignUpValidator };
