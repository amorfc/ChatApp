import {UserModel} from "../../../models/auth-model";

export type LoginUserCredentials = {
    username: string
    password: string
}

export type SignUpUserCredentials ={
    username:string,
    password:string
}

export type User = {
    firstname: string
    lastname: string
}

export type AuthError = {
    code:string,
    message:string,
    id:string
}

export type AuthStateType = {
    authToken:string | null | undefined
    isAppInitLoading:boolean,
    signupHasError: boolean,
    signupErrorMessage: string | undefined,
    signupSuccess: boolean,
    loginHasError: boolean,
    loginErrorMessage: string | undefined,
    isAuthStatusLoading:boolean,
    user?:UserModel,
}
