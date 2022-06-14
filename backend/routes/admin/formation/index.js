import express from "express";
const router = express.Router();

import {
  archiveFormation,
  getEditableFormation,
  startFormation,
  updateFormation,
} from "../../../models/formation";

import multer from "multer";
const upload = multer({ dest: "/tmp" });

import {
  createFormation,
  getAdminFormation,
  getCategories,
} from "../../../models/formation";
import inscription from "./inscription";
import presence from "./presence";

// create new Fromation
router.get("/new",async (_, res) => {
  const categories = await getCategories();
  res.render("createFormation", { categories });
});

const formationFilesUploader = upload.fields([
  { name: "pdf", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

// create new Fromation
router.post("/new", formationFilesUploader,async (req, res) => {
  const { title, description, category, duration } = req.body;

  const user = req.session.user;

  const id =await  createFormation(title, description, category, duration, user);

  // move files to file with a name
  res.redirect("/admin#"+id);
});

// on formation selected
router.get("/:id", async (req, res) => {
  // const type = "open" | "archived" | "active";
  const { id } = req.params;
  const formation = await getAdminFormation(id);

  if (formation.type == "open") {
    res.render("demandes", formation);
  } else {
    const totalStudents = formation.groups.reduce(
      (acc, v) => acc + v.students,
      0
    );

    const teachers = formation.groups
      .reduce((acc, v) => `${acc}, ${v.teacher}`, "")
      .slice(2);

    res.render("active", { ...formation, teachers, totalStudents });
  }
});

// edit formation
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  const formation = getEditableFormation(id);
  const categories = getCategories();

  res.render("editFormation", { ...formation, categories });
});

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;

  const { title, description, category, duration } = req.body;

  updateFormation(id, { title, description, category, duration });

  res.send("edited formation");
  // res.redirect("/admin");
});

// start the formation
router.get("/:id/start", async (req, res) => {
  const { id } = req.params;
  await startFormation(id);
  res.redirect("/admin"); // todo use id and #
});

// start the formation
router.get("/:id/archive", async (req, res) => {
  const { id } = req.params;
  await archiveFormation(id);
  res.redirect("/admin"); // todo use id and #
});

router.use(
  "/:id/inscription",
  (req, _, next) => {
    req.formation = req.params.id;
    next();
  },
  inscription
);
router.use(
  "/:id/presence",
  (req, _, next) => {
    req.formation = req.params.id;
    next();
  },
  presence
);

export default router;
