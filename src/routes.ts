import express from "express";
import {
  createParagraph,
  deleteParagraph,
  getParagraph,
  updateParagraph,
} from "./controllers/paragraph";
import { getConfession } from "./controllers/confession";

const router = express.Router();

// -----------------------------------------
// PARAGRAPHS
router.get("/paragraphs", getParagraph);
router.post("/paragraphs", createParagraph);
router.put("/paragraphs/:id", updateParagraph);
router.delete("/paragraphs/:id", deleteParagraph);

// -----------------------------------------
// SERVICES
router.get("/services", (req, res) => {
  res.send("services");
});

// -----------------------------------------
// CONFESSIONS
router.get("/confessions", getConfession);

// -----------------------------------------
// NEWS
router.get("/news", (req, res) => {
  res.send("news");
});

export default router;
