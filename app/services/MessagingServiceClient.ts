import { LoginResponse } from "../models/Response/LoginResponse";
import { makeRequest } from "./http-service";
import { RequestModel } from "../models/request-model";
import { HttpMethod } from "../models/http-method";
import { ResponseModel } from "../models/response-model";
import { SignUpResponse } from "../models/Response/SignUpResponse";
import { LoginRequest } from "../models/Request/LoginRequest";
import { SignUpRequest } from "../models/Request/SignUpRequest";
import { IMessagingServiceClient } from "./interface/IMessagingServiceClient";

class MessagingServiceClient implements IMessagingServiceClient {
    login = async (request: LoginRequest): Promise<LoginResponse> => {
        let loginResult: LoginResponse = this.createDefaultLoginResponse()
        const loginRequestModel: RequestModel = this.createLoginRequestModel(request)

        try {
            const loginResponse: ResponseModel<LoginResponse> = await makeRequest<LoginResponse>(loginRequestModel)

            if (loginResponse.isSuccessful && loginResponse.data !== undefined) {
                loginResult = loginResponse.data
            }
        } catch (e) {
            loginResult.message = e.message.toString()
        }
        return loginResult
    }

    private createDefaultLoginResponse = (): LoginResponse => {
        return {
            isAuthenticated: false,
            token: "",
            message: 'default_message'
        }
    }

    private createLoginRequestModel = (requestBody: LoginRequest): RequestModel => {
        return {
            method: HttpMethod.post,
            endpoint: "/Auth/Login",
            data: requestBody
        }
    }

    signUp = async (request: SignUpRequest): Promise<SignUpResponse> => {
        let signUpResult: SignUpResponse = this.createDefaultSignUpResponse()
        const signUpRequestModel: RequestModel = this.createSignUpRequestModel(request)

        try {
            const signUpResponse: ResponseModel<SignUpResponse> = await makeRequest<SignUpResponse>(signUpRequestModel)

            if (signUpResponse.isSuccessful && signUpResponse.data !== undefined) {
                signUpResult = signUpResponse.data;
            }
        } catch (e) {
            signUpResult.message = e.message.toString();
        }
        return signUpResult
    }

    private createDefaultSignUpResponse = (): SignUpResponse => {
        return {
            isSuccessful: false,
            message: ""
        }
    }

    private createSignUpRequestModel = (requestBody: SignUpRequest): RequestModel => {
        return {
            method: HttpMethod.post,
            endpoint: "/Auth/Login",
            data: requestBody
        }
    }
}
