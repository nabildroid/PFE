import DB from "../bdd";

// create a inscription
export async function createInscription(
  formation,
  name,
  fonction,
  organisme,
  email,
  tel
) {
  const { results } = await DB(
    "insert into etudiant(nom,mail,fonction,organisme) values(?,?,?,?)",
    [name, email, fonction, organisme, tel]
  );

  await DB(
    "insert into conserne(formation,etudiant,etat) values (?,?,'attend')",
    [formation, results.insertId]
  );
}

// get a list of inscription of a formation
export async function getInscriptions(formation) {
  const { results } = await DB(
    "select * from conserne JOIN etudiant ON etudiant.id = conserne.etudiant where conserne.formation=?",
    [formation]
  );

  return results.map((r) => ({
    id: r.id,
    accepted: r.etat == "accepté",
    email: r.mail,
    name: r.nom,
  }));
}

// get a one inscription
export async function getInscription(id) {
  const { results } = await DB(
    "SELECT *,etudiant.nom as etudiant, formation.nom as nomFormation from etudiant JOIN conserne as conserne on conserne.etudiant = etudiant.id JOIN formation on formation.id = conserne.formation where etudiant.id = ?",
    [id]
  );

  const [inscription] = results;

  return {
    nom: inscription.etudiant,
    formation: inscription.nomFormation,
    email: inscription.mail,
    organisme: inscription.organisme,
    fonction: inscription.fonction,
  };
}

export function archiveInscription(id) {
  // todo archive a inscription
}

// set group to one inscription
export async function setGroup(inscription, group) {
  await DB("update etudiant set groupe = ? where id= ?", [group, inscription]);
  await DB("update conserne set etat = 'accepté' where etudiant= ? ", [
    inscription,
  ]);
}

// todo mark a inscription as present for today (NOW)
export function setPresent(id) {}
