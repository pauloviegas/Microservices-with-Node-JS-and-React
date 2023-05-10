import exprress from "express";

const router = exprress.Router();

router.post("/api/users/signin", (req, res) => {
  res.send("Hi there!");
});

export { router as signinRouter };
