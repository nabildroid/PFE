import express from "express";
const router = express.Router();

import salles from "./salle";
import formation from "./formation";

// ensures the use is authenticated
router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else res.redirect("/login");
});

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.render("admin");
});

router.use("/salles", salles);
router.use("/formation", formation);

export default router;
