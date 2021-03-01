import {AxiosResponse} from "axios";
import {AuthResponseDataType} from "../../../models/auth-model";
import {makePost} from "../../../services/http-service";
import {UserCredentials} from "./auth-types";

export const temp_env_backend_url = "192.168.31.62"

export const auth_api_signUp = async (signUpRequestBody: any): Promise<AxiosResponse<AuthResponseDataType>> => {
    //Local host causes an error for android
    const url = `http://${temp_env_backend_url}:8038/api/Auth/SignUp`
    const config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }
    try{

        const singUpResult: AxiosResponse<AuthResponseDataType> = await makePost(
            url,
            config,
            signUpRequestBody
        )
        return singUpResult

    }catch (e) {
        return e
    }
}

export const auth_api_login = async (loginReqBody:any): Promise<AxiosResponse<AuthResponseDataType>> => {
    const url = `http://${temp_env_backend_url}:8038/api/Auth/Login`
    const config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    try{
        const loginResult: AxiosResponse<AuthResponseDataType> = await makePost(
            url,
            config,
            loginReqBody
        )
        return loginResult

    }catch (e) {
        return e
    }
}
