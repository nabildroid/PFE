import DB from "../bdd";

// returns a list of formations and a list of categories
export function getFormations() {
    const formations = [
        {
            id: 1,
            title: "Excel",
            category: "Bureautique",
            image: "/images/formation.png",
        },
        {
            id: 2,
            title: "Cryptographie symétrique",
            category: "securité",
            image: "/images/formation.png",
        },
        {
            id: 3,
            title: "PHP",
            category: "Bureautique",
            image: "/images/formation.png",
        },
        {
            id: 4,
            title: "RSA",
            category: "securité",
            image: "/images/formation.png",
        },
        {
            id: 5,
            title: "Node",
            category: "Bureautique",
            image: "/images/formation.png",
        },

        {
            id: 6,
            title: "PowerPoint",
            category: "Bureautique",
            image: "/images/formation.png",
        },
    ];

    const categories = [
        ...formations.reduce((acc, v) => acc.add(v.category), new Set()),
    ];

    return { formations, categories };
}

export function getAdminForamtion() {
    return [
        {
            id: 1,
            title: "Excel",
            students: 25,
            groups: 3,
            state: "active",
        },
        {
            id: 2,
            title: "PowerPoint",
            students: 500,
            groups: 10,
            state: "ouvert",
        },
        {
            id: 3,
            title: "PHP",
            students: 50,
            groups: 3,
            state: "archive",
        },
    ];
}

// get one formation
export function getFormation(id) {
    return {
        id,
        title: "PHP",
        file: "https://drive.google.com/file/d/1XT3p9oPxaFxAbhtyiQOrURdSWoaGKB3B/view?usp=sharing",
    };
}

// update one formation
export function setFormation(id, data) {}
