import { Request, Response } from "express";
import Confession from "../models/confession";

export const getConfession = (req: Request, res: Response) => {
  Confession.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.send(items);
    }
  });
};
