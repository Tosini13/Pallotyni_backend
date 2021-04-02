import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SService = new Schema({
  title: {
    type: String,
    required: [true, "Service title is required"],
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
  time: {
    type: String,
    required: [true, "Service time is required"],
  },
  priest: {
    type: String,
    required: false,
  },
});

const Service = mongoose.model("service", SService);

export default Service;

export type TService = {
  title: string;
  time: string;
  days?: string[];
  date?: string;
  priest: string;
};
