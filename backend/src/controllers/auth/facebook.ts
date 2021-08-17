import { Request, Response } from "express";

export const facebook = (req: Request, res: Response) => {
  return res.send("Succes loggin");
};
