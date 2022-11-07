export class User {
    username: string;
    password?: string;
    id?: string;
    forename?: string; 
    surname?: string;
    role: string;

    constructor(username: string, role: string, id?: string, forename?: string,
        surname?: string) {
            this.username = username;
            this.id = id;
            this.forename = forename;
            this.surname = surname;
            this.role = role;
        }

}