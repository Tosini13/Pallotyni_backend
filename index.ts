import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./src/routes";
import path from "path";
require("dotenv").config();

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.szdk8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

mongoose.Promise = global.Promise;

// MIDDLEWARE

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  next();
});

app.use("/gallery", express.static("gallery"));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../Pallotyni/build")));

app.use("/api", router);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Pallotyni/build", "index.html"));
});

const PORT = 3013;

app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running now at https://localhost:${PORT}`
  );
});
