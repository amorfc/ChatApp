import {UserModel} from "../../../models/UserModel";

export type UserCredentials = {
    email: string
    password: string
}

export type User = {
    firstname: string
    lastname: string
}

export type NewUser = User & UserCredentials

export type AuthError = {
    code:string,
    message:string,
    id:string
}

export type AuthState = {
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    signupHasError: boolean,
    signupErrorMessage: string | undefined,
    signupSuccess: boolean,
    user:UserModel | null
}
