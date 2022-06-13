import express from "express";
import { getSalles } from "../../models/salles";
import { getTeachers } from "../../models/teachers";
const router = express.Router();

router.get("/", (req, res) => {
    const teachers = getTeachers();
    res.render("teachers", { teachers });
});

router.get("/new", (req, res) => {
    res.render("teachers");
});

router.post("/", (req, res) => {
    const { name } = req.body;
});

export default router;
