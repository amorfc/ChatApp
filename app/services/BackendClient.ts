import {LoginResponse} from "../models/Response/LoginResponse";
import {makeRequest} from "./http-service";
import {RequestModel} from "../models/request-model";
import {HttpMethod} from "../models/http-method";
import {ResponseModel} from "../models/response-model";
import {LoginUserCredentials, SignUpUserCredentials} from "../redux/features/auth/auth-types";
import {SignUpResponse} from "../models/Response/SignUpResponse";
import {LoginRequest} from "../models/Request/LoginRequest";
import {SignUpRequest} from "../models/Request/SignUpRequest";


interface IMessagingServiceClient {
    login(request: LoginRequest): Promise<LoginResponse>

    signUp(request: SignUpRequest): Promise<SignUpResponse>
}


async function login(request: LoginRequest): Promise<LoginResponse> {

    let loginResult: LoginResponse = createDefaultLoginResponse()

    const loginRequestModel: RequestModel = createLoginRequestModel(request)

    try {
        const loginResponse: ResponseModel<LoginResponse> = await makeRequest<LoginResponse>(loginRequestModel)

        if (loginResponse.isSuccessful && loginResponse.data !== undefined) {
            loginResult = loginResponse.data
        }
    } catch (e) {
        console.log(`Login Request Error -> ${e}`)
    }
    return loginResult
}


const createDefaultLoginResponse = (): LoginResponse => {
    return {
        isAuthenticated: false,
        token: "",
        message: 'default_message'
    }
}
const createLoginRequestModel = (requestBody: LoginRequest): RequestModel => {
    return {
        method: HttpMethod.post,
        endpoint: "/Auth/Login",
        data: requestBody
    }
}

async function signUp(request: SignUpRequest): Promise<SignUpResponse> {
    let signUpResult: SignUpResponse = {
        isSignUpSuccessful: false,
        message: ''
    }
    const signUpRequestModel: RequestModel = {
        method: HttpMethod.post,
        endpoint: "/Auth/SignUp",
        data: userCredentials
    }
    try {
        const signUpResponse: ResponseModel<SignUpResponse> = await makeRequest<SignUpResponse>(signUpRequestModel)
        if (signUpResponse.isSuccessful) {
            signUpResult.isSignUpSuccessful = true
        } else {
            signUpResult.message = signUpResponse.message
        }
    } catch (e) {
        console.log(`Error Occured When User Signing Up ${e}`)
    }
    return signUpResult
}

export const BackendClient: IMessagingServiceClient = {
    login,
    signUp
}
