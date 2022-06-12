import express from "express";
const router = express.Router();

import multer from "multer";
const upload = multer({ dest: "/tmp" });

import { createFormation, getCategories } from "../../../models/formation";
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
    console.log("openeing a formation!!");
    const type = "open" | "archived" | "active";
    res.send("hello world");
});

// update the formation
router.patch("/:id", (req, res) => {
    const type = "open" | "archived" | "active";
});

// set state
router.post("/:id/", (req, res) => {
    const { state } = req.body;
});

router.use("/:id/inscription", inscription);
router.use("/:id/presence", presence);

export default router;
