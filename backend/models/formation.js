import DB from "../bdd";

export function getCategories() {
    return ["Bureautique", "Securité"];
}

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

export function getAdminForamtions() {
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

export function getAdminFormation(id) {
    // todo add archived ones;

    const open = {
        id,
        title: "Excel",
        type: "open",
        demandes: [
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
        ],
    };

    const active = {
        id,
        title: "PHP",
        type: "active",
        groups: [
            {
                id: 1,
                title: "1",
                teacher: "Nabil Lakrib",
                teaterId: 2, //todo use id and hashtag to navigate to the teacher
                students:10,
            },
            {
                id: 2,
                title: "2",
                teacher: "Ikram Dellici",
                titleId: 1,
                students:50,
            },
        ],
    };

    return open;
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

// create new formation and return its id;
export function createFormation(title, description, category, duration, user) {
    return 11;
}
