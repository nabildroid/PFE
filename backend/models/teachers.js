import DB from "../bdd";

export async function getTeachers() {
  const { results: teachers } = await DB("select * from fourmateur");

  return teachers.map((a) => ({
    id: a.id,
    name: a.nom,
    email: a.mail,
    tel: a.tel,
  }));
}

export async function createTeacher(name, tel, email) {
  const { results } = await DB(
    "insert into fourmateur(nom,mail,tel) values(?,?,?)",
    [name, tel, email]
  );
  const { insertId } = results;

  return insertId;
}

export async function deleteTeacher(id) {
  const { results } = await DB(
    "select etudiant.id as etudiant, groupe.id as groupe from groupe JOIN etudiant on etudiant.groupe = groupe.id where fourmateur =?",
    [id]
  );
  console.log(results);
  for (const group of results) {
    const { etudiant } = group;

    await DB("update etudiant set groupe = null where id=?", [etudiant]);
    await DB("update conserne set etat ='attend' where etudiant=?", [etudiant]);
  }

  for (const group of results) {
    const { groupe } = group;

    await DB("delete from groupe where id=?", [groupe]);
  }

  await DB("delete from fourmateur where id=?", [id]);
  console.log("delelling ..", id);
}
