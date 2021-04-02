import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SNews = new Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: [true, "News content is required"],
  },
  createdAt: {
    type: String,
    required: [true, "News createdAt is required"],
  },
});

const News = mongoose.model("news", SNews);

export default News;

export type TNews = {
  title: string;
  content: string;
  createdAt: string;
};
