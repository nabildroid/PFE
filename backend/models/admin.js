import DB from "../bdd";

export async function validateInfo(name, password) {
    const { results } = await DB(
        "select id from admin where mail=? and password=?",
        [name, password]
    );

    return results.length ? results[0].id : false;
}
