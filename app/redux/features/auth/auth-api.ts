import {AxiosResponse} from "axios";
import {AuthResponseDataType} from "../../../models/auth-model";
import {makePost} from "../../../services/http-service";
import {UserCredentials} from "./auth-types";

export const auth_api_signUp = async (signUpRequestBody: any): Promise<AxiosResponse<AuthResponseDataType>> => {
    const url = "http://localhost:8038/api/Auth/SignUp"
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const singUpResult: AxiosResponse<AuthResponseDataType> = await makePost(
        url,
        config,
        signUpRequestBody
    )
    return singUpResult
}

export const auth_api_login = async (loginReqBody:any): Promise<AxiosResponse<AuthResponseDataType>> => {
    const url = "http://localhost:8038/api/Auth/Login"
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const loginResult: AxiosResponse<AuthResponseDataType> = await makePost(
        url,
        config,
        loginReqBody
    )
    return loginResult
}
