import express from "express";
const router = express.Router();

import salles from "./salle";
import teachers from "./teacher";
import formation from "./formation";

import { getAdminForamtions } from "../../models/formation";

// ensures the use is authenticated
router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else res.redirect("/login");
});

/* GET users listing. */
router.get("/",async (req, res) => {
    const formations =await getAdminForamtions();

    res.render("admin", { formations });
});

router.use("/salles", salles);
router.use("/formation", formation);
router.use("/teachers", teachers);

export default router;
