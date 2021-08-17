import { Request, Response } from "express";
import AvatarModel from "../../models/Avatar.model";
import PhotoModel from "../../models/Photo.model";
import TagsModel from "../../models/Tags.model";
import UserModel from "../../models/User.model";

export const getSearchPhotos = async (req: Request, res: Response) => {
  const { text } = req.params;
  const photos = await PhotoModel.findAll({
    include: [
      {
        model: TagsModel,
        as: "tags",
        where: {
          name: text.toLowerCase(),
        },
      },
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
    status: 200,
    photos,
  });
};
