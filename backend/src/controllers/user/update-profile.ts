import { Request, Response } from "express";
import { pusher } from "../../app";
import AvatarModel from "../../models/Avatar.model";
import UserModel from "../../models/User.model";
import cloudinary from "cloudinary";
import ui from "uniqid";
import { environments } from "../../environments/environments";

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, description, email, phone, avatar } = req.body;

  if (avatar) {
    try {
      const oldPhoto = await AvatarModel.findOne({
        where: {
          userId: id,
        },
      });

      if (oldPhoto?.public_id) {
        destroyPhotoCloud(oldPhoto.public_id);
      }

      await oldPhoto?.destroy();

      const newPhoto = await AvatarModel.create({
        secure_url: avatar.secure_url,
        public_id: avatar.public_id,
        id: ui(),
        userId: id,
      });

      pusher.trigger("my-gallery", "user-photo-updated", {
        message: "Photo User updated",
      });

      return res.status(200).json({
        message: "User updated",
        status: true,
        newPhoto,
      });
    } catch (err) {
      throw err;
    }
  }

  try {
    await UserModel.update(
      {
        fullName,
        description,
        email,
        phone,
      },
      {
        where: {
          id: id,
        },
      }
    );

    pusher.trigger("my-gallery", "user-updated", {
      message: "Profile updated",
    });

    return res.status(200).json({
      message: "User updated",
      status: true,
    });
  } catch (err) {
    throw err?.message;
  }
};

export const destroyPhotoCloud = async (public_id: string) => {
  try {
    await cloudinary.v2.uploader.destroy(public_id);

    return;
  } catch (err) {
    console.log("ERROR", { ...err });
  }
};
