import DB from "../bdd";

export async function getSalles() {
  const { results: salles } = await DB("select * from salle");

  return salles.map(a=>({
    id:a.id,
    name:a.nom,
    max:a.max
  }));
  
}

export async function createSalle(name, max) {
  const { results } = await DB("insert into salle(nom,max) values(?,?)", [
    name,
    max,
  ]);
  const { insertId } = results;

  return insertId;
}

export function deleteSalle(name) {}
