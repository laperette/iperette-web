export class User {
    firstname: string = ""
    lastname: string = ""
    mail: string = ""
    phone: string = ""
    password: string = ""
}

/** needed fields at sign up */
export interface UserSignup {
    firstname: String
    lastname: String
    email: String
    password: String
    phone?: String
}

/** needed fields at sign in */
export interface UserSignin {
    email: String
    password: String
}

/** returned fields when authentication is successfull */
export interface UserSignedIn {
    color: string
    email: string
    firstname: string
    lastname: string
    token: string
}