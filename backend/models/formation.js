import DB from "../bdd";
import { getGroups } from "./group";
import { getInscriptions } from "./inscription";

export async function getCategories() {
  return ["Bureautique", "Securité"];
}

// returns a list of formations and a list of categories
export async function getFormations() {
  const { results } = await DB("select * from formation");

  const formations = results.map((f) => ({
    id: f.id,
    title: f.nom,
    category: f.type,
    image: "/images/formation.png",
  }));

  const categories = [
    ...formations.reduce((acc, v) => acc.add(v.category), new Set()),
  ];

  return { formations, categories };
}

export async function getAdminForamtions() {
  const { results } = await DB(
    "SELECT formation.nom,formation.id,formation.dateDebut,formation.dateFin, COUNT(DISTINCT etudiant.groupe) as gg ,count(etudiant.id) as ss from formation JOIN conserne on conserne.formation = formation.id JOIN etudiant ON etudiant.id = conserne.etudiant group by formation.id"
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

export function getEditableFormation(id) {
  return {
    id,
    title: "PHP",
    description: "an editable description for this formation AKA cours",
    category: "tech",
    duration: 2,
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
      title: "PHP",
      type: "active",
      groups,
    };

    return active;
  }
  // todo add archived ones;
}

// get one formation
export function getFormation(id) {
  return {
    id,
    title: "PHP",
    file: "https://drive.google.com/file/d/1XT3p9oPxaFxAbhtyiQOrURdSWoaGKB3B/view?usp=sharing",
  };
}

// update one formation
export function updateFormation(id, data) {}

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

export function archiveFormation(id) {}
