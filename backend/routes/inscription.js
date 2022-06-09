const express = require("express");
const { routes } = require("../app");
const router = express.Router();

/* GET home page. */
router.get("/:id", function (req, res, next) {
    const id = req.params.id;
    res.render("inscription", { title: id });
});

router.post("/:id", (req, res) => {
    const {name,fonction} = res.body;
    res.render("inscription");
});

function getFomation(id) {
    return {
        title: "formation1",
        file: "dzedzedzed",
    };
}

module.exports = router;
