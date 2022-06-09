import express from "express";
const router = express.Router();

import inscription from "./inscription";
import presence from "./presence";

// create new Fromation
router.post("/new", (req, res) => {
    const { name, title, description } = req.body;
});

// on formation selected
router.get("/:id", (req, res) => {
    const type = "open" | "archived" | "active";
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