import exprress, { Request, Response } from "express";

import { User } from "../models/user";
import { validateRequest } from "../middlewares/validateRequest";
import { userSignInValidator } from "../validators/userSignInValidator";
import { generateUserSession } from "../middlewares/generateUserSession";

const router = exprress.Router();

router.post(
  "/api/users/signin",
  userSignInValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    req = generateUserSession(existingUser!, req);

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
