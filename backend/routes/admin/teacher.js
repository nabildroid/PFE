import express from "express";
import { getSalles } from "../../models/salles";
import { getTeachers, createTeacher } from "../../models/teachers";
const router = express.Router();

router.get("/", async (req, res) => {
    const teachers = await getTeachers();
    res.render("teachers", { teachers });
});

router.get("/new", (req, res) => {
    res.render("createTeacher");
});

router.post("/new", async (req, res) => {
    const { name, email, tel } = req.body;
    const id = await createTeacher(name, tel, email);
    // todo redirect to the new teachers using id and #
    res.redirect("/admin/teachers#" + id);
});

export default router;
