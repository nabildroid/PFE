import express from "express";
import {
  getTeachers,
  createTeacher,
  deleteTeacher,
} from "../../models/teachers";
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
  res.redirect("/admin/teachers#" + id);
});

router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  await deleteTeacher(id);

  res.redirect("/admin/teachers");
});

export default router;
