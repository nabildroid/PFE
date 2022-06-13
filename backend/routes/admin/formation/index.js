import express from "express";
const router = express.Router();

import {
    archiveFormation,
    getEditableFormation,
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
router.get("/new", (_, res) => {
    const categories = getCategories();
    res.render("createFormation", { categories });
});

const formationFilesUploader = upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
]);

// create new Fromation
router.post("/new", formationFilesUploader, (req, res) => {
    const { title, description, category, duration } = req.body;

    const { user } = req.session;

    const id = createFormation(title, description, category, duration, user);

    // move files to file with a name
    res.redirect("/admin");
});

// on formation selected
router.get("/:id", (req, res) => {
    // const type = "open" | "archived" | "active";
    const { id } = req.params;
    const formation = getAdminFormation(id);

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
    res.send("showing the details of one selected formation");
});

// archive formation
router.get("/:id/archive", (req, res) => {
    
    const { id } = req.params;
    archiveFormation(id);
    res.send("archiving the formation");
    // res.redirect("/admin");
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

router.use("/:id/inscription", inscription);
router.use("/:id/presence", presence);

export default router;
