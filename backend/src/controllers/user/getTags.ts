import { Request, Response } from "express";

export const getTags = (req: Request, res: Response) => {
  const options = [
    {
      name: "City",
      id: 1,
    },
    {
      name: "Night",
      id: 2,
    },
    {
      name: "Landscape",
      id: 3,
    },
    {
      name: "Forest",
      id: 4,
    },

    {
      name: "Day",
      id: 5,
    },
    {
      name: "Sunset",
      id: 6,
    },
    {
      name: "Dark",
      id: 7,
    },
    {
      name: "Blue",
      id: 8,
    },

    {
      name: "Yellow",
      id: 9,
    },
    {
      name: "Green",
      id: 10,
    },
    {
      name: "Pink",
      id: 11,
    },
    {
      name: "Urban",
      id: 12,
    },
    {
      name: "Minimal",
      id: 13,
    },
    {
      name: "Caotic",
      id: 14,
    },
    {
      name: "Love",
      id: 15,
    },
    {
      name: "Heart",
      id: 16,
    },
  ];
  return res.status(200).json({
    options,
  });
};
