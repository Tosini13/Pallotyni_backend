import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const SPhotograph = new Schema({
  description: {
    type: String,
    required: false,
  },
  path: {
    type: String,
    required: [true, "Photograph path is required"],
  },
});

export type TPhotograph = {
  description?: string;
  path: string;
};
export type TPhotographRes = TPhotograph & {
  id: string;
};

export interface IPhotograph extends Document {
  description?: string;
  path: string;
}

const Photograph = mongoose.model<IPhotograph>("photograph", SPhotograph);

export default Photograph;
