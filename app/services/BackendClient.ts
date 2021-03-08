import {LoginResponse} from "../models/LoginModels/LoginResponse";
import {makeRequest} from "./http-service";
import {RequestModel} from "../models/request-model";
import {HttpMethod} from "../models/http-method";
import {ResponseModel} from "../models/response-model";
import {UserCredentials} from "../redux/features/auth/auth-types";
import {SignUpResponse} from "../models/SingUpModels/SignUpResponse";


interface BackendClient {
    // SignUp = (signUpModel:SignUpModel)=>{
    //
    // }
    login(userCredentials: UserCredentials): Promise<LoginResponse>
    signUp(userCredentials: UserCredentials): Promise<SignUpResponse>
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

async function signUp(userCredentials:UserCredentials): Promise<SignUpResponse>{
    let signUpResponse:SignUpResponse = {
        isSignUpSuccessful:false
    }
    const signUpRequestModel: RequestModel = {
        method:HttpMethod.post,
        endpoint:"/Auth/SignUp"
    }
    try {
        const signUpResponse:ResponseModel<SignUpResponse> = await makeRequest<SignUpResponse>(signUpRequestModel)
        if(signUpResponse.isSuccessful){
            signUpResponse.isSuccessful = true
        }
    }catch (e) {
        console.log(`Error Occured When User Signing Up ${e}`)
    }
    return signUpResponse
}

export const BackendClient:BackendClient = {
    login,
    signUp
}
