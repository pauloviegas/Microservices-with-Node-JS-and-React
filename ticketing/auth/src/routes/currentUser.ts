import exprress from "express";

const router = exprress.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!");
});

export { router as currentUserRouter };
