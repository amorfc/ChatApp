import { LoginRequest } from "../../models/Request/LoginRequest";
import { SignUpRequest } from "../../models/Request/SignUpRequest";
import { LoginResponse } from "../../models/Response/LoginResponse";
import { SignUpResponse } from "../../models/Response/SignUpResponse";

export interface IMessagingServiceClient {
    login(request: LoginRequest): Promise<LoginResponse>
    signUp(request: SignUpRequest): Promise<SignUpResponse>
}