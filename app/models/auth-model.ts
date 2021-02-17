export type UserModel = {
    firstName:string,
    lastName:string,
    email:string,
    username:string
}

export type AuthResponseData = {
    isAuthenticated:boolean,
    message:string,
    token:string
}


export type AuthResponseDataType = AuthResponseData | any;
