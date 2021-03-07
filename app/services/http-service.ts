import axios, {AxiosResponse, Method} from "axios";
import {RequestModel} from "../models/request-model";
import {ResponseModel} from "../models/response-model";
import {getHttpMethodsAsString, HttpMethod} from "../models/http-method";

export const makePost = (
    endpoint: string,
    config: any,
    data: any
): Promise<any> => {
    return new Promise(async(resolve, reject) => {
        try{
            const reqResponse = await axios.post(endpoint,data,config)
            resolve(reqResponse)
        }catch (e){
            reject(e)
        }
    })
}

export async function makeRequest<T>(requestModel:RequestModel,baseUrl:string | undefined = undefined):Promise<ResponseModel<T>>{
    let response:ResponseModel<T> = {
        isSuccessful:false,
        message:``,
        data:undefined
    }
    try{
        let axios_response = await axios.request({
            url:requestModel.endpoint,
            baseURL:baseUrl,
            method:getHttpMethodsAsString(requestModel.method) as Method,
            data:requestModel.data
        })
        response = axiosResponseModelMapToResponseModel<T>(response,axios_response)

    }catch (e) {
        response.message = e.toString()
    }
    return response
}

function axiosResponseModelMapToResponseModel<T>(responseModel:ResponseModel<T>, axiosResponse:AxiosResponse):ResponseModel<T>{

    let axiosResponseIsSuccessful = axiosResponse.status >= 200 && axiosResponse.status < 300
    responseModel.isSuccessful =  axiosResponseIsSuccessful
    if(axiosResponseIsSuccessful){
        responseModel.data = axiosResponse.data
    }

    responseModel.message = axiosResponse.statusText

    return responseModel
}

// export const makeRequest T: ResponseModel = (requestModel:RequestModel<TRequest>) <TRequest,TResponse> :Promise<ResponseModel<TResponse>>=>{
//
//
//
// }
