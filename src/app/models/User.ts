export class User {
    firstname: string
    lastname: string
    mail: string
    phone: string
    constructor(first, last, mail) {
        this.firstname = first
        this.lastname = last
        this.mail = mail
    }
}