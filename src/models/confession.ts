import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SConfession = new Schema({
  title: {
    type: String,
    required: [true, "Confession title is required"],
  },
  date: {
    type: String,
    required: false,
  },
  days: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },
  fromTime: {
    type: String,
    required: [true, "Confession fromTime is required"],
  },
  toTime: {
    type: String,
    required: [true, "Confession fromTime is required"],
  },
  priest: {
    type: String,
    required: false,
  },
});

const Confession = mongoose.model("confession", SConfession);

export default Confession;

export type TConfession = {
  title: string;
  date?: string;
  days?: string[];
  fromTime: string;
  toTime: string;
  priest: string;
};
