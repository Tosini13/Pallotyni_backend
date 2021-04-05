import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { DATE_FILE_NAME } from "../models/global";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "gallery/");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.replace("image/", "");
    const originalname = file.originalname.replace(" ", "_").replace("/", "_");
    const filename = `${originalname}_${format(new Date(), DATE_FILE_NAME)}`;
    cb(null, `${filename}.${extension}`);
  },
});

export const multerConfig = multer({
  dest: "gallery",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Wrong file format!"));
    }
    cb(null, true); //CallBack
  },
  storage: multerStorage,
});

export const uploadImage = (req: Request, res: Response) => {
  res.send(req.file.filename);
};

export const uploadImageError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).send({ error: err.message });
};
