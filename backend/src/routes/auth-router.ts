import { Router } from "express";
import passport from "passport";
import { facebook } from "../controllers/auth/facebook";
import { loginUser } from "../controllers/auth/login-user";
import { registerUser } from "../controllers/auth/register-user";
import { unauthorized } from "../controllers/auth/unauthorized";
import { validateEmail } from "../controllers/auth/validate_email.controller";

const router = Router();

router.get(
  "/facebook",
  passport.authenticate("facebook_strategy", {
    scope: ["email"],
  }),
  facebook
);

router.post("/", validateEmail);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/unauthorized", unauthorized);

export default router;
