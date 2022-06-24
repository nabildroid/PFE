import os from "os";
import path from "path";
import fs from "fs";

import express from "express";
import * as html_to_pdf from "html-pdf-node";

const router = express.Router();
import {
  getAttestations,
  getGroups,
  getInscriptionFromGroup,
} from "../../../models/group";
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

router.post("/:gId", async (req, res) => {
  const presents = Object.keys(req.body);

  for (let p of presents) {
    await setPresent(p);
  }
  res.redirect("/admin");
});

router.get("/:gId/attestations", async (req, res) => {
  const groupId = req.params.gId;

  const students = await getAttestations(groupId);
  const f = await createAttestations(students);

  res.sendFile(f);
});

async function createAttestations(students) {
  let template = createPDFTemplate(students);

  let options = {
    printBackground: true,
    landscape: true,
    margin: {
      top: "35px",
    },
  };

  let file = { content: template };

  const tempFilePath = path.join(os.tmpdir(), "aaaaaaa" + ".pdf");

  await new Promise((res) => {
    html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      fs.writeFileSync(tempFilePath, pdfBuffer);
      res();
    });
  });

  return tempFilePath;
}

function createPDFTemplate(students) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>attestation</title>
      
    </head>
    <body>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;500;900&display=swap" rel="stylesheet">



${students.map((s) => createPDFAttesationPage(s)).join(" ")}
  
</body>
</html>
  `;
}

function createPDFAttesationPage(s) {
  return `<div style="text-align:center;border:4px solid #000;margin:0 35px; padding:5px; height:100%;color:#1c4c70;font-size:21px;">
  <h3 style="margin: 8px 0px 0px 0px;">الجمهورية الجزائرية الديمقراطية الشعبية</h3>
  <h5 style="margin: 8px 0px 0px 0px;">République Algérienne Démocratique et Populaire</h5>
  <h3 style="margin: 8px 0px 0px 0px;">وزارة التعليم العالي و البحث العلمي</h3>
  <h5 style="margin: 8px 0px 0px 0px;">Ministère de l’Enseignement Supérieur et de la Recherche Scientifique</h5>

  <div style="text-align:left;font-size:16px;font-weight:bold;">Réf <p style="display:inline-block; margin:0 50px;">/DFCAV/SFT/2022.</p></div>
  <div><i style="font-size:40px;">ATTESTATION</i><img src="https://pfe.laknabil.me/images/logo.png"/></div>

  <div class="text-align:left">
    <p style="float:left;text-align:left;font-size:16px;font-weight:bold;">Centre de Recherche sur l’Information <br>
    Scientifique et Technique</p>
    <p style="float:right;font-size:16px;font-weight:bold;">مركز البحث في الإعلام العلمي و التقني</p>
  </div>
  <div style="overflow: auto;clear: both;"></div>

  <div style="text-align:left;margin: 0 auto; width:80%">
    <div><i>Le Directeur du centre de recherche sur l’information scientifique et technique (CERIST) certifie que,</i></div>
    <div>Monsieur, <p style="display:inline-block; margin:0 25px;">${
      s.name
    }</p></div>
    <div>Né (e) le, <p style="display:inline-block; margin:0 25px;">${
      formatDate(s.birth)
    }</p></div>
    <div style="margin: 16px 0px 0px 0px;">A suivi la session de formation intitulée: ${
      s.title
    }</div>

    <div>Qui s’est déroulée au CERIST du ${formatDate(s.start)} a ${formatDate(s.end)} </div>
    <div style="margin: 16px 0px 0px 0px;"><i>Cette attestation est délivrée pour servir et valoir ce que de droit.</i></div>

    <div style="text-align:right;margin: 16px 0px 0px 0px;">Fait à Alger, le ${formatDate(new Date())}</div>
    <div style="text-align:center;margin: 16px 0px 80px 0px;">P/le Directeur du Centre</div>
  </div>
  
  
  
  
  </div>
  <div style="page-break-before: always;"></div>`;
}

function formatDate(d) {
  return new Date(d).toISOString().split("T")[0];
}
export default router;
