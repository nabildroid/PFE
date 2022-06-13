import express from "express";
const router = express.Router();

import { getFormation } from "../models/formation";
import { createInscription } from "../models/inscription";

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
    const { name, fonction, organisme, email, tel } = req.body;
    const { id } = res.params;

    createInscription(id, name, fonction, organisme, email, tel);
    res.redirect("/");
});

export default router;
