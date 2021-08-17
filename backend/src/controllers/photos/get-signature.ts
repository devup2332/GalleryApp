import { Request, Response } from "express";
import cloudinary from "cloudinary";
import { environments } from "../../environments/environments";

export const getSignature = async (req: Request, res: Response) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp,
    },
    environments.CD.CD_API_SECRET as string
  );
  return res.json({
    signature,
    timestamp,
    api_key: environments.CD.CD_API_KEY,
  });
};
