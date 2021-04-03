import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./src/routes";

const app = express();

mongoose.connect("mongodb://localhost/Pallotyni_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.use("/api", router);

const PORT = 3013;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
