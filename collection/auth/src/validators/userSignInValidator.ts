import { body } from "express-validator";

import { User } from "../models/user";
import { BadRequestError } from "../errors/BadRequestError";
import { Password } from "../services/password";

const userSignInValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("email").custom(async (email) => {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }
  }),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
  body("password").custom(async (password, { req }) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const passwordMatch = await Password.compare(
        existingUser.password,
        password
      );
      if (!passwordMatch) {
        throw new BadRequestError("Invalid credentials");
      }
    }
  }),
];

export { userSignInValidator };
