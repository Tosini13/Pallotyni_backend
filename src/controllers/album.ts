import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Album, { IAlbum, TAlbum, TAlbumRes } from "../models/album";

const convertAlbum = (album: LeanDocument<IAlbum>): TAlbumRes => ({
  id: album._id,
  title: album.title,
  description: album.description,
  photos: album.photos,
});

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

export const deleteAlbum = (req: Request, res: Response) => {
  // TODO: Delete all the file from the album
  Album.findByIdAndRemove({ _id: req.params.id })
    .then((n) => n && res.send(convertAlbum(n)))
    .catch((e) => console.log(e));
};
