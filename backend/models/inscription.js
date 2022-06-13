import DB from "../bdd";

// create a inscription
export function createInscription(formation,name,fonction,organisme,email,tel) {

}

// get a list of inscription of a formation
export function getInscriptions(formation) {
    return [
        {
            id: 1,
            name: "Nabil Lakrib",
            email: "pni20156789@gmail.com",
            accepted: true,
        },
        {
            id: 2,
            name: "Ikram Dellici",
            email: "karouma0delli2001@gmail.com",
            accepted: false,
        },
    ];
}

// get a one inscription
export function getInscription(id) {
    return {
        nom: "Nabil Lakrib",
        formation: "PHP",
        email: "pni20156789@gmail.com",
        organisme: "Faculté de science - Alger 1",
        fonction: "examlple de fonction",
    };
}

export function archiveInscription(id) {}

// set group to one inscription
export function setGroup(id, group) {}

// mark a inscription as present for today (NOW)
export function setPresent(id) {}
