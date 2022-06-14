import DB from "../bdd";

export async function getGroups(formation) {
  const { results: groups } = await DB(
    "select count(etudiant.nom) as ss,groupe.heure, groupe.id, fourmateur.id as fourmateurID, fourmateur.nom as fourmateurNom from etudiant JOIN groupe on etudiant.groupe = groupe.id JOIN fourmateur on fourmateur.id = groupe.fourmateur group BY(groupe.id)",
    [formation]
  );

  return groups.map((g, i) => ({
    id: g.id,
    title: i+1,
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

export function getInscriptionFromGroup(group) {
  // todo implement presence
  return [
    {
      name: "Nabil Lakrib",
      id: 1,
    },
    {
      name: "Toufik Lakrib",
      id: 2,
    },
    {
      name: "Lakrib Imen",
      id: 3,
    },
    {
      name: "Nabildroid",
      id: 4,
    },
    {
      name: "Utilisateur 1",
      id: 5,
    },
    {
      name: "Khabash 1",
      id: 6,
    },
    {
      name: "Khabash 2",
      id: 7,
    },
  ];
}
