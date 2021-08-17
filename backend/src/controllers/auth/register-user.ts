import { Request, Response } from "express";
import UserModel from "../../models/User.model";
import { generateToken } from "./generateToken";
import bcrypt from "bcrypt";
import ui from "uniqid";
import { environments } from "../../environments/environments";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, password, email, phone } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password, salt);

    const idUser = ui();
    const idAvatar = ui();

    const newUser = await UserModel.create(
      {
        id: idUser,
        fullName,
        password: passwordCrypt,
        email,
        phone,
        provider: "form",
        avatar: {
          id: idAvatar,
          secure_url: environments.DEFAULT.PHOTO,
        },
      },
      {
        include: "avatar",
      }
    );

    const token = generateToken(newUser);

    return res.status(200).json({
      user: newUser,
      status: "User Created Successfully",
      token,
    });
  } catch (err) {
    console.log({ ...err });
    return res.status(200).json({
      message: { ...err },
    });
  }
};
