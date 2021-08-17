import { Request, Response } from "express";
import AvatarModel from "../../models/Avatar.model";
import UserModel from "../../models/User.model";

export const getProfile = async (req: Request, res: Response) => {
  const id = (req.user as any).id as string;
  const user = await UserModel.findByPk(id, {
    include: [
      {
        model: AvatarModel,
        as: "avatar",
      },
    ],
  });

  if (!user) {
    return res
      .status(200)
      .json({ message: "User logged not found", status: false });
  }

  return res.status(200).json({ user });
};
