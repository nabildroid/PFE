import DB from "../bdd";

export function getSalles() {
    return [
        {
            id: 1,
            name: "14",
            max: 25,
        },
        {
            id: 2,
            name: "R2",
            max: 30,
        },
        {
            id: 3,
            name: "salle des cours, 6e etage",
            max: 10000,
        },
    ];
}

export function createSalle(name) {}

export function deleteSalle(name) {}
