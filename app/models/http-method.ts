export enum HttpMethod {
    post,
    get,
    put,
    delete
}

export const getHttpMethodsAsString = (method: HttpMethod):string => {
    let result: string = "GET"
    switch (method) {
        case HttpMethod.post:
            result="POST"
            break
        case HttpMethod.put:
            result="PUT"
            break
        case HttpMethod.delete:
            result="DELETE"
            break
        default:
            break
    }
    return result
}
