const express = require("express");
const router = express.Router();

const salles = require("./salle");
const formation = require("./formation");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.render("admin");
});

router.use("/salles", salles);
router.use("/formation", formation);

module.exports = router;
