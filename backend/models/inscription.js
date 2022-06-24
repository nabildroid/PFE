import DB from "../bdd";

// create a inscription
export async function createInscription(
  formation,
  name,
  fonction,
  organisme,
  email,
  tel,
  birth
) {
  const { results } = await DB(
    "insert into etudiant(nom,mail,fonction,organisme,dnaissance) values(?,?,?,?,?)",
    [name, email, fonction, organisme,birth]
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
    archived: r.etat == "archiver",
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
    id,
    nom: inscription.etudiant,
    formation: inscription.nomFormation,
    email: inscription.mail,
    organisme: inscription.organisme,
    fonction: inscription.fonction,
  };
}

export async function archiveInscription(id) {
  await DB("update etudiant set groupe = null where id=?", [id]);
  await DB("update conserne set etat = 'archiver' where etudiant = ?", [id]);
}

// set group to one inscription
export async function setGroup(inscription, group) {
  await DB("update etudiant set groupe = ? where id= ?", [group, inscription]);
  await DB("update conserne set etat = 'accepté' where etudiant= ? ", [
    inscription,
  ]);
}

export async function setPresent(id) {
  let day;
  const { results: exists } = await DB(
    'SELECT * from journ where date = date_format(NOW(),"%y-%m-%d")'
  );
  if (exists.length) {
    day = exists[0].id;
  } else {
    const { results } = await DB("insert into journ(date) values (NOW())");
    day = results.insertId;
  }

  await DB("insert into present(etudiant, jour) values (?,?)", [id, day]);
  console.log("setting the presence for", id);
}
