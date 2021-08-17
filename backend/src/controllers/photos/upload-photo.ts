import { Request, Response } from "express";
import PhotoModel from "../../models/Photo.model";
import TagsModel from "../../models/Tags.model";
import UserModel from "../../models/User.model";
import ui from "uniqid";

export const UploadNewPhoto = async (req: Request, res: Response) => {
  const id = (req.user as any).id;
  const photoId = ui();

  const { description, name, tags, image , width, height} = req.body;

  const newPhoto = await PhotoModel.create({
    secure_url: image.secure_url,
    public_id: image.public_id,
    width: width,
    height: height,
    description,
    name,
    id: photoId,
    userId: id,
  });

  for (const tag of tags) {
    const tagId = ui();
    await TagsModel.create({
      id: tagId,
      name: tag.name,
      photoId: newPhoto.id,
    });
  }

  const u = await UserModel.findByPk(req.params.id, {
    include: [
      {
        model: PhotoModel,
        as: "photos",
        include: [
          {
            model: TagsModel,
            as: "tags",
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: true,
    u,
    message: "Photo uploaded",
  });
};
