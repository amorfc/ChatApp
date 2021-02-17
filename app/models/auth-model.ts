export type UserModel = {
    firstName:string | null,
    lastName:string | null,
    email:string | null,
    username:string | null
}

export type AuthResponseData = {
    isAuthenticated:boolean,
    message:string,
    token:string,
    user:UserModel | null
}


export type AuthResponseDataType = AuthResponseData | any;
