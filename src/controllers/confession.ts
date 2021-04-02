import { Request, Response } from "express";
import Confession, { TConfession } from "../models/confession";

export const getConfession = (req: Request, res: Response) => {
  Confession.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.send(items);
    }
  });
};

export const createConfession = (req: Request, res: Response) => {
  const confession: TConfession = {
    title: req.body.title,
    date: req.body.date,
    days: req.body.days,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    priest: req.body.priest,
  };
  Confession.create(confession)
    .then((c) => res.send(c))
    .catch((err) => console.log(err));
};

export const updateConfession = (req: Request, res: Response) => {
  const confession: TConfession = {
    title: req.body.title,
    date: req.body.date,
    days: req.body.days,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    priest: req.body.priest,
  };
  Confession.findByIdAndUpdate({ _id: req.params.id }, confession)
    .then((c) => {
      Confession.findOne({ _id: req.params.id })
        .then((c) => res.send(c))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const deleteConfession = (req: Request, res: Response) => {
  Confession.findByIdAndRemove({ _id: req.params.id })
    .then((c) => res.send(c))
    .catch((err) => console.log(err));
};
