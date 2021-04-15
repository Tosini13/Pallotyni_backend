import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const SAlbum = new Schema({
  title: {
    type: String,
    required: [true, "Title album is required"],
  },
  description: {
    type: String,
    required: false,
  },
  photos: {
    type: [String],
    required: [true, "Photos array of album is required"],
  },
});

export type TAlbum = {
  title: string;
  description: string;
  photos: Array<string>;
};

export type TAlbumRes = TAlbum & {
  id: string;
};

export interface IAlbum extends Document {
  title: string;
  description: string;
  photos: Array<string>;
}

const Album = mongoose.model<IAlbum>("album", SAlbum);

export default Album;
