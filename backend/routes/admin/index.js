import express from "express";
const router = express.Router();

import salles from "./salle";
import formation from "./formation";

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.render("admin");
});

router.use("/salles", salles);
router.use("/formation", formation);

export default router;