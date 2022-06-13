import express from "express";
import { getSalles } from "../../models/salles";
import { getTeachers, createTeacher } from "../../models/teachers";
const router = express.Router();

router.get("/", (req, res) => {
    const teachers = getTeachers();
    res.render("teachers", { teachers });
});

router.get("/new", (req, res) => {
    res.render("createTeacher");
});

router.post("/new", (req, res) => {
    const { name, email, tel } = req.body;
    const id = createTeacher(name, tel, email);
    // todo redirect to the new teachers using id and #
    res.redirect("/admin/teachers#" + id);
});

export default router;
