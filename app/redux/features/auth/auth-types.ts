
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
}
