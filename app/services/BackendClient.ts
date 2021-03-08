import {LoginModel} from "../models/LoginModels/LoginModel";
import {LoginResponse} from "../models/LoginModels/LoginResponse";
import {makeRequest} from "./http-service";
import {LoginRequest} from "../models/LoginModels/LoginRequest";
import {RequestModel} from "../models/request-model";
import {HttpMethod} from "../models/http-method";
import {ResponseModel} from "../models/response-model";
import {UserCredentials} from "../redux/features/auth/auth-types";


interface BackendClient {
    // SignUp = (signUpModel:SignUpModel)=>{
    //
    // }
    login(loginModel: LoginModel): Promise<LoginResponse>

}


async function login(userCredentials: UserCredentials): Promise<LoginResponse> {

    let loginResult:LoginResponse = {
        isAuthenticated:false,
        token:"",
        message:''
    }

    const loginRequestModel: RequestModel = {
        method: HttpMethod.post,
        endpoint: "/Auth/Login",
        data: userCredentials
    }

    try {
        const loginResponse:ResponseModel<LoginResponse> = await makeRequest<LoginResponse>(loginRequestModel)

        if(loginResponse.isSuccessful && loginResponse.data !== undefined){
            loginResult = loginResponse.data
        }
    } catch (e) {
        console.log(`Login Request Error -> ${e}`)
    }
    return loginResult
}

export const BackendClient:BackendClient = {
    login
}
