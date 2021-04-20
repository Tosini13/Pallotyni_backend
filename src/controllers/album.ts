import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Album, {
  IAlbum,
  TAlbum,
  TAlbumRes,
  TAlbumReq,
  TPhotographCreateAndAddToAlbumReq,
} from "../models/album";
import Photograph, { TPhotograph } from "../models/photograph";
const ObjectID = require("mongodb").ObjectID;

export const convertAlbum = (album: LeanDocument<IAlbum>): TAlbumRes => ({
  id: album._id,
  title: album.title,
  description: album.description,
  photos: album.photos,
});

export const getAlbums = (req: Request, res: Response) => {
  Album.find({})
    .then((items) => res.send(items.map((item) => convertAlbum(item))))
    .catch((err) => console.log(err));
};

export const getAlbum = (req: Request, res: Response) => {
  Album.find({})
    .then((items) => res.send(items.map((item) => convertAlbum(item))))
    .catch((err) => console.log(err));
};

export const createAlbum = (req: Request, res: Response) => {
  const album: TAlbum = {
    title: req.body.title,
    description: req.body.description,
    photos: [],
  };

  Album.create(album)
    .then((n) => res.send(convertAlbum(n)))
    .catch((e) => console.log(e));
};

export const updateAlbum = (req: Request, res: Response) => {
  const album: TAlbum = {
    title: req.body.title,
    description: req.body.description,
    photos: req.body.photos || [],
  };

  Album.findByIdAndUpdate({ _id: req.params.id }, album)
    .then((oldAlbum) => {
      Album.findOne({ _id: req.params.id })
        .then(
          (updatedAlbum) => updatedAlbum && res.send(convertAlbum(updatedAlbum))
        )
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

type TPhotographsToAlbum = Array<
  TPhotograph & {
    id: string;
  }
>;
export const createManyPhotographsAndAddToAlbum = async (
  req: Request,
  res: Response
) => {
  const paths: string[] = req.body;
  const photographs: TPhotograph[] = paths.map((path) => ({
    path: path,
    createdAt: new Date().toISOString(),
  }));
  try {
    const photographsData = await Photograph.insertMany(photographs);
    const albumToUpdate = await Album.findOne({ _id: req.params.id });
    if (!albumToUpdate) return false;
    const album: TAlbum = {
      title: albumToUpdate.title,
      description: albumToUpdate.description,
      photos: [
        ...albumToUpdate.photos,
        ...photographsData.map((photo) => photo._id.toString()),
      ],
    };
    const oldAlbum = await Album.findByIdAndUpdate(
      { _id: req.params.id },
      album
    );
    console.log("OK");
    res.send(oldAlbum);
  } catch (err) {
    console.log(err);
  }
};

export const deleteAlbum = (req: Request, res: Response) => {
  // TODO: Delete all the file from the album
  Album.findByIdAndRemove({ _id: req.params.id })
    .then((n) => n && res.send(convertAlbum(n)))
    .catch((e) => console.log(e));
};
