export class User {
    firstname: string = ""
    lastname: string = ""
    email: string = ""
    phone: string = ""
    password: string = ""
    constructor(first?: string, last?: string, email?: string) {

    }
}

/** needed fields at sign up */
export interface UserSignup {
    firstname: string
    lastname: string
    email: string
    password: string
    phone?: string
}

/** needed fields at sign in */
export interface UserSignin {
    email: string
    password: string
}

/** returned fields when authentication is successfull */
export interface UserSignedIn {
    color: string
    email: string
    firstname: string
    lastname: string
    token: string
}