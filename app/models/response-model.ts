export type ResponseModel<T> = {
    data?: T,
    isSuccessful:boolean,
    message:string,
}
