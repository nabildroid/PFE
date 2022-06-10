import express from "express";
const router = express.Router();

import inscription from "./inscription";
import presence from "./presence";

// create new Fromation
router.get("/new", (req, res) => {
    const { name, title, description } = req.body;
    res.send("hello world");
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