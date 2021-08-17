import { Router } from "express";
import passport from "passport";
import { getSignature } from "../controllers/photos/get-signature";
import { getPhotos } from "../controllers/photos/get-photos";
import { getUserPhotos } from "../controllers/photos/get-user-photos";
import { uploadAvatar } from "../controllers/user/upload-avatar";
import { UploadNewPhoto } from "../controllers/photos/upload-photo";
import { getSearchPhotos } from "../controllers/photos/get-search-photos";
import { deletePhoto } from "../controllers/photos/delete-photo";

const router = Router();

router.post(
  "/upload-avatar",
  passport.authenticate("jwt_strategy"),
  uploadAvatar
);
router.post(
  "/upload-photo",
  passport.authenticate("jwt_strategy"),
  UploadNewPhoto
);
router.get("/signature", passport.authenticate("jwt_strategy"), getSignature);
router.get("/:id", passport.authenticate("jwt_strategy"), getUserPhotos);
router.get("/", getPhotos);
router.get("/search/:text", getSearchPhotos);
router.delete("/:id", deletePhoto);

export default router;
