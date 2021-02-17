import {AxiosResponse} from "axios";
import {AuthResponseDataType} from "../../../models/auth-model";
import {makePost} from "../../../services/http-service";

export const auth_api_signUp = async (signUpRequestBody:any): Promise<AxiosResponse<AuthResponseDataType>> => {
    const url = "http://localhost:8038/api/Auth/SignUp"
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const singUpResult:AxiosResponse<AuthResponseDataType> = await makePost(
        url,
        config,
        signUpRequestBody
    )
    return singUpResult
}
