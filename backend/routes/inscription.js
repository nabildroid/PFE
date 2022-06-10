import express from "express";
const router = express.Router();

import { getFormation } from "../models/formation";

/* GET home page. */
router.get("/:id", function (req, res, next) {
    const id = req.params.id;
    const formation = getFormation(id);

    res.render("inscription", {
        formation,
        title: "Formation " + formation.title,
    });
});

router.post("/:id", (req, res) => {
    const { name, fonction } = res.body;
    res.render("inscription");
});

export default router;
