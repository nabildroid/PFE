import express from "express";
const router = express.Router();

import { getFormation } from "../models/formation";
import { createInscription } from "../models/inscription";

/* GET home page. */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (id == "favicon.ico") return res.send("icon");

  const formation = await getFormation(id);

  res.render("inscription", {
    formation,
    title: "Formation " + formation.title,
  });
});

router.post("/:id", (req, res) => {
  const { name, fonction, organisme, email, tel } = req.body;
  const { id } = req.params;

  createInscription(id, name, fonction, organisme, email, tel);
  res.redirect("/");

  // https://tailwindui.com/components/application-ui/overlays/modals
  // redirect in local
});

export default router;
