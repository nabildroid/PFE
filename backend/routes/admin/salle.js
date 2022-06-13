import express from "express";
import { createSalle, getSalles } from "../../models/salles";
const router = express.Router();

router.get("/", (req, res) => {
    const salles = getSalles();
    res.render("salles", { salles });
});

router.get("/new", (req, res) => {
    res.render("createSalle");
});

router.post("/new", (req, res) => {
    const { name, max } = req.body;

    createSalle(name,max);

    res.redirect("/admin/salles");
});

export default router;
