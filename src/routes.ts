import express from "express";
import { getParagraph } from "./controllers/paragraph";

const router = express.Router();

// -----------------------------------------
// PARAGRAPHS
router.get("/paragraphs", getParagraph);

// -----------------------------------------
// SERVICES
router.get("/services", (req, res) => {
  res.send("services");
});

// -----------------------------------------
// CONFESSIONS
router.get("/confessions", (req, res) => {
  res.send("confessions");
});

// -----------------------------------------
// NEWS
router.get("/news", (req, res) => {
  res.send("news");
});

export default router;
