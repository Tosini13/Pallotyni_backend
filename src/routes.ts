import express from "express";
import {
  createParagraph,
  deleteParagraph,
  getParagraph,
  updateParagraph,
} from "./controllers/paragraph";
import {
  createConfession,
  deleteConfession,
  getConfession,
  updateConfession,
} from "./controllers/confession";
import {
  createService,
  deleteService,
  getService,
  updateService,
} from "./controllers/service";
import {
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
} from "./controllers/news";
import { deleteImage, multerConfig, uploadImage } from "./controllers/images";
import {
  createPhotograph,
  deletePhotograph,
  getPhotographs,
  updatePhotograph,
} from "./controllers/photograph";

const router = express.Router();

// -----------------------------------------
// PARAGRAPHS
router.get("/paragraphs", getParagraph);
router.post("/paragraphs", createParagraph);
router.put("/paragraphs/:id", updateParagraph);
router.delete("/paragraphs/:id", deleteParagraph);

// -----------------------------------------
// SERVICES
router.get("/services", getService);
router.post("/services", createService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

// -----------------------------------------
// CONFESSIONS
router.get("/confessions", getConfession);
router.post("/confessions", createConfession);
router.put("/confessions/:id", updateConfession);
router.delete("/confessions/:id", deleteConfession);

// -----------------------------------------
// NEWS
router.get("/news", getAllNews);
router.post("/news", createNews);
router.put("/news/:id", updateNews);
router.delete("/news/:id", deleteNews);

// -----------------------------------------
// PHOTOGRAPHS
router.get("/photographs", getPhotographs);
router.post("/photographs", createPhotograph);
router.put("/photographs/:id", updatePhotograph);
router.delete("/photographs/:id", deletePhotograph);

// -----------------------------------------
// IMAGES
router.post("/images", multerConfig.single("img"), uploadImage);
router.put("/images/:path", multerConfig.single("img"), uploadImage);
router.delete("/images/:path", deleteImage);

export default router;
