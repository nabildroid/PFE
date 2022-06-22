import DB from "../bdd";

export async function getSalles() {
  const { results: salles } = await DB("select * from salle");

  return salles.map((a) => ({
    id: a.id,
    name: a.nom,
    max: a.max,
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

export async function deleteSalle(id) {
  const { results } = await DB(
    "select etudiant.id as etudiant, groupe.id as groupe from groupe JOIN etudiant on etudiant.groupe = groupe.id where salle =?",
    [id]
  );
  if (results.length) {
    const [group] = results;
    const { groupe, etudiant } = group;
    console.log(group);

    await DB("update etudiant set groupe = null where id=?", [etudiant]);
    await DB("update conserne set etat ='attend' where etudiant=?", [etudiant]);
    await DB("delete from groupe where id=?", [groupe]);
  }

  await DB("delete from salle where id=?", [id]);
  console.log("delelling ..", id);
}
