export class Firma {
    username: string;
    id?: string;
    name?: string;
    role: string;

    constructor(username: string, role: string, id?: string, name?: string,
        surname?: string) {
            this.username = username;
            this.id = id;
            this.name = name;
            this.role = role;
        }
}