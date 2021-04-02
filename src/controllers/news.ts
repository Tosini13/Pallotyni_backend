import { format } from "date-fns";
import { Request, Response } from "express";
import { DATE_TIME_FORMAT } from "../models/global";
import News, { TNews } from "../models/news";

export const getAllNews = (req: Request, res: Response) => {
  News.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.send(items);
    }
  });
};

export const createNews = (req: Request, res: Response) => {
  console.log(format(new Date(), DATE_TIME_FORMAT));
  const news: TNews = {
    title: req.body.title,
    content: req.body.content,
    createdAt: format(new Date(), DATE_TIME_FORMAT),
  };

  News.create(news)
    .then((n) => res.send(n))
    .catch((e) => console.log(e));
};

export const updateNews = (req: Request, res: Response) => {
  console.log(format(new Date(), DATE_TIME_FORMAT));
  const news: TNews = {
    title: req.body.title,
    content: req.body.content,
    createdAt: format(new Date(), DATE_TIME_FORMAT),
  };

  News.findByIdAndUpdate({ _id: req.params.id }, news)
    .then((oldNews) => {
      News.findOne({ _id: req.params.id })
        .then((updatedNews) => res.send(updatedNews))
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

export const deleteNews = (req: Request, res: Response) => {
  News.findByIdAndRemove({ _id: req.params.id })
    .then((n) => res.send(n))
    .catch((e) => console.log(e));
};
