import { Request } from "express";
import jwt from "jsonwebtoken";

import { UserDoc } from "../models/user";

const generateUserSession = (user: UserDoc, req: Request) => {
  const { email, username, role } = user;

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email,
      username,
      role,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  return req;
};

export { generateUserSession };
