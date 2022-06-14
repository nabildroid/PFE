import express from "express";
const router = express.Router();
import { getGroups, getInscriptionFromGroup } from "../../../models/group";
import { getAdminFormation } from "../../../models/formation";
import { setPresent } from "../../../models/inscription";

router.get("/:gId", async (req, res) => {
  const groupId = req.params.gId;
  const { formation } = req;
  const { title } = await getAdminFormation(formation);
  const groups = await getGroups(formation);
  const list = await getInscriptionFromGroup(groupId);

  const group = groups.findIndex((e) => e.id == groupId) + 1;
  res.render("presence", {
    title,
    list,
    group,
  });
});

router.post("/:gId", async(req, res) => {
  const presents = Object.keys(req.body);

  for (let p of presents) {
    await setPresent(p);
  }
  res.redirect("/admin");
});

router.get("/attestations", (req, res) => {});

export default router;
