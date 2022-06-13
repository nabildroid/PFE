import DB from "../bdd";

export function getGroups(formation) {
    return [
        {
            id: 1,
            title: "1",
            teacher: "Nabil Lakrib",
            teaterId: 2, //todo use id and hashtag to navigate to the teacher
            students: 10,
            time: "8:00",
        },
        {
            id: 2,
            title: "2",
            teacher: "Ikram Dellici",
            titleId: 1,
            students: 50,
            time: "13:00",
        },
    ];
}

export function createGroup(formation, salle, teacher, time) {}

export function getInscriptionFromGroup(group) {
    return [
        {
            name:"Nabil Lakrib",
            id:1,
        },
        {
            name:"Toufik Lakrib",
            id:2,
        },
        {
            name:"Lakrib Imen",
            id:3,
        }
        ,
        {
            name:"Nabildroid",
            id:4,
        }
        ,
        {
            name:"Utilisateur 1",
            id:5,
        }
        ,
        {
            name:"Khabash 1",
            id:6,
        }
        ,
        {
            name:"Khabash 2",
            id:7,
        }
        



    ]
}


