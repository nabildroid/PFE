import DB from "../bdd";

export async function getGroups(formation) {
  const { results: groups } = await DB(
    "select count(etudiant.nom) as ss,groupe.heure, groupe.id, fourmateur.id as fourmateurID, fourmateur.nom as fourmateurNom from etudiant JOIN groupe on etudiant.groupe = groupe.id JOIN fourmateur on fourmateur.id = groupe.fourmateur group BY(groupe.id)",
    [formation]
  );

  return groups.map((g, i) => ({
    id: g.id,
    title: i + 1,
    teacher: g.fourmateurNom,
    teacherId: g.fourmateurID,
    time: g.heure,
    students: g.ss,
  }));
}

export async function createGroup(formation, salle, teacher, time) {
  const { results } = await DB(
    "insert into groupe(formation,salle,fourmateur,heure) values(?,?,?,?)",
    [formation, salle, teacher, time]
  );
  const { insertId } = results;

  return insertId;
}

export async function getInscriptionFromGroup(group) {
  const { results } = await DB("select * from etudiant where groupe = ?", [
    group,
  ]); // todo make sure the student is accepted

  return results.map((r) => ({
    id: r.id,
    name: r.nom,
  }));
}
