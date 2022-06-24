import { filePath } from "../app";
import DB from "../bdd";
import { getGroups } from "./group";
import { getInscriptions } from "./inscription";

export async function getCategories() {
  return [
    "Sciences documentaires",
    "Langage de programmation",
    "Technologie du web",
    "Audiovisuel & multimédia",
    "Réseaux de communication sans fil et mobile",
    "Systèmes d’information et bases de données",
  ];
}

// returns a list of formations and a list of categories
export async function getFormations() {
  const { results } = await DB("select * from formation");

  const formations = results
    .filter((f) => !f.dateDebut && !f.dateFin)
    .map((f) => ({
      id: f.id,
      title: f.nom,
      category: f.type,
      image: filePath(f.id,"image"),
    }));

  const categories = [
    ...formations.reduce((acc, v) => acc.add(v.category), new Set()),
  ];

  return { formations, categories };
}

export async function getAdminForamtions() {
  const { results } = await DB(
    "SELECT formation.nom,formation.id,formation.dateDebut,formation.dateFin, COUNT(DISTINCT etudiant.groupe) as gg ,count(etudiant.id) as ss from formation left JOIN conserne on conserne.formation = formation.id left JOIN etudiant ON etudiant.id = conserne.etudiant group by formation.id"
  );
  return results.map((r) => {
    let state = "archive";
    if (r.dateDebut && !r.dateFin) state = "active";
    if (!r.dateDebut && !r.dateFin) state = "ouvert";

    return {
      id: r.id,
      title: r.nom,
      students: r.ss,
      groups: r.gg,
      state,
    };
  });
}

export async function getEditableFormation(id) {
  const { results } = await DB("select * from formation where id= ?", [id]);
  const [formation] = results;

  // todo edit formation
  return {
    id,
    title: formation.nom,
    category: formation.type,
    duration: formation.dure,
  };
}

export async function getAdminFormation(id) {
  const { results } = await DB("select * from formation where id=?", [id]);

  const [selected] = results;
  if (!selected.dateDebut && !selected.dateFin) {
    const demandes = await getInscriptions(id);
    const open = {
      id,
      title: selected.nom,
      type: "open",
      demandes,
    };
    return open;
  } else {
    const groups = await getGroups(id);

    const active = {
      id,
      title: selected.nom,
      type: "active",
      groups,
    };

    return active;
  }
  // todo add archived ones;
}

// get one formation
export async function getFormation(id) {
  const { results } = await DB("SELECT * from formation where id=?", [id]);
  // todo upload files

  const [formation] = results;
  return {
    id,
    title: formation.nom,
    file: filePath(id,"pdf"),
  };
}

// update one formation
export async function updateFormation(id, data) {
  await DB("update formation set nom=?,dure=?,type=? where id=?", [
    data.title,
    data.duration,
    data.category,
    id,
  ]);
}

// create new formation and return its id;
export async function createFormation(
  title,
  description,
  category,
  duration,
  user
) {
  const { results } = await DB(
    "insert into formation(nom,type,dure,admin) values(?,?,?,?)",
    [title, category, duration, user]
  );

  const { insertId } = results;

  return insertId;
}

export async function archiveFormation(id) {
  await DB("update formation set dateFin = NOW() where id=?", [id]);
}
export async function startFormation(id) {
  await DB("update formation set dateDebut = NOW() where id=?", [id]);
}
