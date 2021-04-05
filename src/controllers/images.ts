import fs from "fs";
import { format } from "date-fns";
import { Request, Response } from "express";
import multer from "multer";
import { DATE_FILE_NAME } from "../models/global";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "gallery");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.replace("image/", "");
    const originalname = file.originalname.replace(" ", "_").replace("/", "_");
    const filename = `${originalname}_${format(new Date(), DATE_FILE_NAME)}`;
    cb(null, `${filename}.${extension}`);
  },
});

export const multerConfig = multer({
  storage: multerStorage,
});

export const uploadImage = (req: Request, res: Response) => {
  res.send(req.file.filename);
};

export const updateImage = (req: Request, res: Response) => {
  const rootPath = path.dirname(require.main?.filename ?? "");
  fs.unlink(`${rootPath}\\gallery\\${req.params.path}`, () =>
    res.send(req.params.path)
  );
};

export const deleteImage = (req: Request, res: Response) => {
  const rootPath = path.dirname(require.main?.filename ?? "");
  fs.unlink(`${rootPath}\\gallery\\${req.params.path}`, () =>
    res.send(req.params.path)
  );
};
