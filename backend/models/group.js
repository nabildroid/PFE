import DB from "../bdd";

export async function getGroups(formation) {
  const { results: groups } = await DB(
    "select *, fourmateur.id as fourmateurID, fourmateur.nom as fourmateurNom from groupe JOIN fourmateur on fourmateur.id = groupe.fourmateur where formation=?",
    [formation]
  );

  return groups.map((g, i) => ({
    id: g.id,
    title: i+1,
    teacher: g.fourmateurNom,
    teacherId: g.fourmateurID,
    time: g.heure,
    students: 10, // todo implement this by grouping and counting
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
