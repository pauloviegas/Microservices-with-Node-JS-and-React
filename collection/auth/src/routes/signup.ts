import exprress, { Request, Response } from "express";

import { User } from "../models/user";
import { validateRequest } from "../middlewares/validateRequest";
import { userSignUpValidator } from "../validators/userSignUpValidator";
import { generateUserSession } from "../middlewares/generateUserSession";

const router = exprress.Router();

router.post(
  "/api/users/signup",
  userSignUpValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    const user = User.build({ email, password, username, role: "user" });
    await user.save();

    req = generateUserSession(user, req);

    res.status(201).send(user);
  }
);

export { router as signupRouter };
