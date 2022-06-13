import express from "express";
import { getGroups } from "../../../models/group";
import { getInscription } from "../../../models/inscription";
import { getSalles } from "../../../models/salles";
import { getTeachers } from "../../../models/teachers";
const router = express.Router();

// get insciption
router.get("/:inId", async (req, res) => {
    const { inId, id } = req.params; // todo id of the formation is not working
    const inscription = await getInscription(inId);
    const groups = getGroups(id);
    const salles = getSalles();
    const teachers = getTeachers();

    res.render("demande", {
        inscription,
        groups,
        salles,
        teachers,
    });
});

// delete insciption
router.delete("/:inId", (req, res) => {});

// set insciption group
router.post("/:inId", (req, res) => {
    const { group } = req.body;
});

// set insciption group
router.post("/:inId", (req, res) => {
    const { group } = req.body;
});

export default router;
