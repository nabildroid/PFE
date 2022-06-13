import express from "express";
const router = express.Router();
import { getInscriptionFromGroup } from "../../../models/group";
import { getAdminFormation } from "../../../models/formation";
import { setPresent } from "../../../models/inscription";

router.get("/:gId", (req, res) => {
    const groupId = req.params.gId;

    const { title } = getAdminFormation(1);
    const list = getInscriptionFromGroup(groupId);
    const group = 1;
    res.render("presence", {
        title,
        list,
        group,
    });
});

router.post("/:gId", (req, res) => {
    const presents = Object.values(req.body);

    for (let p of presents) {
        setPresent(p);
    }
    res.redirect("/admin");
});

router.get("/attestations", (req, res) => {});

export default router;
