export class User {
    token: string;
    username: string;
    id?: string;
    name?: string;
    role: string;

    constructor(token: string, username: string, role: string, id?: string, name?: string,
        surname?: string) {
            this.token = token;
            this.username = username;
            this.id = id;
            this.name = name;
            this.role = role;
        }
}