import express from "express";
const router = express.Router();

import salles from "./salle";
import formation from "./formation";

import { getAdminForamtion } from "../../models/formation";

// ensures the use is authenticated
router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else res.redirect("/login");
});

/* GET users listing. */
router.get("/", (req, res) => {
    const formations = getAdminForamtion();

    res.render("admin", { formations });
});

router.use("/salles", salles);
router.use("/formation", formation);

export default router;
