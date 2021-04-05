import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Photograph, {
  IPhotograph,
  TPhotograph,
  TPhotographRes,
} from "../models/photograph";

const convertPhotograph = (
  photograph: LeanDocument<IPhotograph>
): TPhotographRes => ({
  id: photograph._id,
  description: photograph.description,
  path: photograph.path,
});

export const getPhotographs = (req: Request, res: Response) => {
  Photograph.find({})
    .then((items) => res.send(items.map((item) => convertPhotograph(item))))
    .catch((err) => console.log(err));
};

export const createPhotograph = (req: Request, res: Response) => {
  const photograph: TPhotograph = {
    description: req.body.description,
    path: req.body.path,
  };
  Photograph.create(photograph)
    .then((photo) => res.send(convertPhotograph(photo)))
    .catch((e) => console.log(e));
};
