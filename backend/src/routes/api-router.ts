import { Router } from "express";
import UserRouter from "./user-router";
import AuthRouter from "./auth-router";
import PhotosRouter from "./photos-router";
const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/photos", PhotosRouter);

export default router;
