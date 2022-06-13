import express from "express";
import { createSalle, getSalles } from "../../models/salles";
const router = express.Router();

router.get("/", async (req, res) => {
    const salles = await getSalles();
    res.render("salles", { salles });
});

router.get("/new", (req, res) => {
    res.render("createSalle");
});

router.post("/new", async (req, res) => {
    const { name, max } = req.body;

    const id = await createSalle(name,max);

    res.redirect("/admin/salles#"+id);
});

export default router;
