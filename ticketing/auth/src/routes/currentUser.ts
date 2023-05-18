import exprress from "express";

import { currentUser } from "../middlewares/currentUser";

const router = exprress.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
