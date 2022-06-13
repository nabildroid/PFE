import DB from "../bdd";

export async function getTeachers() {
    const { results: teachers } = await DB("select * from fourmateur");

  return teachers.map(a=>({
    id:a.id,
    name:a.nom,
    email:a.mail,
    tel:a.tel,
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
