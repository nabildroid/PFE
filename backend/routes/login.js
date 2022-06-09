const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.post("/", function (req, res, next) {
    const { name, password } = req.body;

    res.render("index", { title: "Express" });
});

function validateAuth(name, password) {
    return true;
}

module.exports = router;
