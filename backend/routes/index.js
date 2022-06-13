import express from "express";
import { getFormations } from "../models/formation";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    const category = req.query.category;
    const { formations, categories } = getFormations();

    res.render("index", {
        title: "CERIST - Formations",
        formations: formations.filter(
            (f) => !category || f.category == category
        ),
        category,
        categories: categories.filter((a) => a != category),
    });
});

export default router;
