import express from "express";
import { getFormations } from "../models/formation";
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const category = req.query.category;
  const { formations, categories } = await getFormations();

  res.render("index", {
    title: "CERIST - Formations",
    formations: formations.filter((f) => !category || f.category == category),
    category,
    categories: categories.filter((a) => a != category),
  });
});

router.get("/about", async function (req, res, next) {
  res.render("about");
});



router.get("/contact", async function (req, res, next) {
  res.render("contact");
});

export default router;
