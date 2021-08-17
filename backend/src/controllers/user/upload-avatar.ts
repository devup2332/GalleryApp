import { Request, Response } from "express";
import AvatarModel from "../../models/Avatar.model";
import uid from "uniqid";

export const uploadAvatar = async (req: Request, res: Response) => {
  const { public_id, secure_url } = req.body;

  const id = uid();

  const avatar = await AvatarModel.create({
    id,
    public_id,
    secure_url,
  });
  return res.status(200).json({
    status: true,
    message: "Avatar upload",
    avatar,
  });
};
