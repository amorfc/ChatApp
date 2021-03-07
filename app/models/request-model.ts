import {HttpMethod} from "./http-method";

export type RequestModel = {
    method:HttpMethod,
    endpoint:string,
    data?: any
}
