import { Router } from "express";
import passport from "passport";
import { updateProfile } from "../controllers/user/update-profile";
import { getProfile } from "../controllers/user/get-profile";
import { getTags } from "../controllers/user/getTags";

const router = Router();

router.get("/profile", passport.authenticate("jwt_strategy"), getProfile);

router.put("/update/:id", passport.authenticate("jwt_strategy"), updateProfile);
router.get("/tags", passport.authenticate("jwt_strategy"), getTags);

export default router;
