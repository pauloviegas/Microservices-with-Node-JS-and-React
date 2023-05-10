import exprress from "express";

const router = exprress.Router();

router.post("/api/users/signout", (req, res) => {
  res.send("Hi there!");
});

export { router as signoutRouter };
