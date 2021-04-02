import { Request, Response } from "express";
import Service, { TService } from "../models/service";

export const getService = (req: Request, res: Response) => {
  Service.find({})
    .then((services) => res.send(services))
    .catch((err) => console.log(err));
};

export const createService = (req: Request, res: Response) => {
  const service: TService = {
    title: req.body.title,
    date: req.body.date,
    days: req.body.days,
    time: req.body.time,
    priest: req.body.priest,
  };
  Service.create(service)
    .then((s) => res.send(s))
    .catch((err) => console.log(err));
};

export const updateService = (req: Request, res: Response) => {
  const service: TService = {
    title: req.body.title,
    date: req.body.date,
    days: req.body.days,
    time: req.body.time,
    priest: req.body.priest,
  };
  Service.findByIdAndUpdate({ _id: req.params.id }, service)
    .then((oldService) => {
      Service.findOne({ _id: req.params.id })
        .then((newService) => res.send(newService))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const deleteService = (req: Request, res: Response) => {
  Service.findByIdAndRemove({ _id: req.params.id })
    .then((s) => res.send(s))
    .catch((err) => console.log(err));
};
