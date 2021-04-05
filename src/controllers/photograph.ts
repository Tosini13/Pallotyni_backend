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

export const updatePhotograph = (req: Request, res: Response) => {
  const photograph: TPhotograph = {
    description: req.body.description,
    path: req.body.path,
  };
  Photograph.findByIdAndUpdate({ _id: req.params.id }, photograph)
    .then((p) => {
      Photograph.findOne({ _id: req.params.id })
        .then((photo) => photo && res.send(convertPhotograph(photo)))
        .catch((err) => console.log(err));
    })
    .catch((e) => console.log(e));
};

export const deletePhotograph = (req: Request, res: Response) => {
  Photograph.findByIdAndRemove({ _id: req.params.id })
    .then((photo) => photo && res.send(convertPhotograph(photo)))
    .catch((err) => console.log(err));
};
