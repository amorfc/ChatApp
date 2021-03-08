export type UserModel = {
    firstName?:string,
    lastName?:string,
    email?:string,
    username:string
}

export type AuthResponseData = {
    isAuthenticated:boolean,
    message:string,
    token:string,
    user:UserModel | null
}


export type AuthResponseDataType = AuthResponseData | any;
