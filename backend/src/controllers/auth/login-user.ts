import { Request, Response } from "express";
import UserModel from "../../models/User.model";
import bcrypt from "bcrypt";
import { generateToken } from "./generateToken";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });
  if (!user || user.provider === "facebook") {
    return res.status(200).json({
      message: "Email dosent exist",
      status: false,
    });
  }

  const match = await bcrypt.compare(password, user.password as string);

  if (!match) {
    return res.status(200).json({
      message: "Password is incorrect",
      status: false,
    });
  }
  const token = generateToken(user);

  return res.status(200).json({
    message: "User Logged",
    token,
    status: true,
  });
};
