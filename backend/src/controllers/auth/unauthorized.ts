import { Request, Response } from "express";

export const unauthorized = (req: Request, res: Response) => {
  return res.send("Vete a la mrd hacker rctm");
};
