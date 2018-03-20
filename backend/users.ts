export class User {
    constructor(public email: string,
        public name: string,
        private password: string) { }

    public matches(another: User): boolean {
        return another !== undefined && another.email === this.email
            && another.password === this.password;
    }
}

export const users = {
    "gabi@uol.com.br": new User('gabi@uol.com.br', 'Gabi', '123'),
    "billie@uol.com.br": new User('billie@uol.com.br', 'Billie', '12345')
}