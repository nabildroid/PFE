const express = require("express");
const router = express.Router();

const inscription = require("./inscription");
const presence = require("./presence");

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



module.exports = router;
