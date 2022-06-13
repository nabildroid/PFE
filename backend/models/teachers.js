import DB from "../bdd";

export function getTeachers() {
    return [
        {
            id: 1,
            name: "Nabil Lakrib",
            tel: "0712345678",
            email: "contact@laknabil.me",
        },
        {
            id: 2,
            name: "Ikram Dellici",
            tel: "0712345678",
            email: "contact@ikram.com",
        },
    ];
}


export function createTeacher(name,tel,email){
    
}