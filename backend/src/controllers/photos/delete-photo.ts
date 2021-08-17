import { Request, Response } from "express";
import { pusher } from "../../app";
import PhotoModel from "../../models/Photo.model";
import { destroyPhotoCloud } from "../user/update-profile";

export const deletePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;

  const photo = await PhotoModel.findByPk(id);

  await destroyPhotoCloud(photo?.public_id ? photo.public_id : "");

  await photo?.destroy();

  console.log("Photo destroyed");

  pusher.trigger("my-gallery", "photo-deleted", {
    message: "Photo Deleted",
  });

  return res.status(200).json({
    message: "Photo deleted",
    status: true,
    photo,
  });
};
