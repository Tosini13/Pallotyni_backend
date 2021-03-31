import { Request, Response } from "express";
import Paragraph from "../models/paragraph";

export const getParagraph = (req: Request, res: Response) => {
  Paragraph.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      console.log("items", items);
      res.send(items);
    }
  });
};
