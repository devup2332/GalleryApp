import { Request, Response } from "express";
import AvatarModel from "../../models/Avatar.model";
import PhotoModel from "../../models/Photo.model";
import UserModel from "../../models/User.model";

export const getPhotos = async (req: Request, res: Response) => {
  const photos = await PhotoModel.findAll({
    include: [
      {
        model: UserModel,
        as: "user",
        include: [
          {
            model: AvatarModel,
            as: "avatar",
          },
        ],
      },
    ],
  });
  return res.status(200).json({
    status: true,
    photos: photos,
  });
};
