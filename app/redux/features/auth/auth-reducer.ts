import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthError, AuthState, NewUser, User, UserCredentials} from "./auth-types";
import {AxiosResponse} from "axios";
import {auth_api_login, auth_api_signUp} from "./auth-api";
import {AuthResponseDataType, UserModel} from "../../../models/auth-model";
import {showMessage} from "react-native-flash-message";


export const signUpProcess = createAsyncThunk<any, NewUser, { rejectValue: AuthError }>(
    'auth/signUpProcess', async (newUser: NewUser, thunkAPI: any): Promise<void> => {
        //Delete All signUpErrors purpose of trying again
        // -------------
        thunkAPI.dispatch(clearSignUpError(null))
        //Loading State
        thunkAPI.dispatch(setIsAuthStatusLoading(true))

        const {firstname, lastname, email, password} = newUser
        //Validation Could Happen Here

        // -------------

        try {
            //Server Request Time

            //Async functions and try here
            //Do request and get response Anf Check response

            const signUpRequestBody = {
                "Username": firstname,
                "Password": password
            }

            const signUpResult = await auth_api_signUp(signUpRequestBody)
            if (signUpResult.status === 200) {
                thunkAPI.dispatch(setSignupSuccess(signUpResult.data))
                showMessage({
                    message:"Welcome",
                    description:"Welcome Happy Chatting",
                    type:"success"
                })
            }else{
                //Api response status not 200
                //Error message will handle
                showMessage({
                    message:"Oops!!",
                    description:"Something Went Wrong Try Again",
                    type:"danger"
                })
            }
        } catch (e) {
            console.log(e)
        }
            thunkAPI.dispatch(setIsAuthStatusLoading(false))

    })

export const loginProcess = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
    'auth/loginProcess',
    async (userCredentials: UserCredentials, thunkAPI: any) => {

        const {email, password} = userCredentials

        const loginReqBody = {
            "Username": email,
            "Password": password
        }

        try {
            //Login Request
            const loginResult: AxiosResponse<AuthResponseDataType> = await auth_api_login(loginReqBody)

            //creatingUserModel For Now
            loginResult.data.user = {
                email: email
            }

            thunkAPI.dispatch(setLoginSuccess(loginResult.data.user))
        } catch (e) {
            console.log(e)
        }

        // -------------
        //Validation Could Happen Here

        // -------------

        //Server Request Time

        //Async functions and try here

        try {
            //Do request and get response Anf Check response

        } catch (e) {
            //Catch if error here

        }
    }
)

const initAuth = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    'auth/initAuth',
    async (_: any, thunkAPI: any) => {
        //Check if any auth data in async storage if Token Not expired set User and Do Auth
        try {

        } catch (e) {

        }
    })

const initialState: AuthState = {
    //Form State
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    //signUp Information
    signupHasError: false,
    signupErrorMessage: undefined,
    signupSuccess: false,
    //Login Information
    loginHasError: false,
    loginErrorMessage: undefined,
    loginSuccess: false,
    //Loader Information
    isAuthStatusLoading: false,
    //Result Information
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthStatusLoading(state, {payload}: PayloadAction<boolean>) {
            state.isAuthStatusLoading = payload
        },
        clearSignUpError(state, {payload}: PayloadAction<any>) {
            state.signupHasError = false
            state.signupErrorMessage = undefined
        },
        setSignupSuccess(state, {payload}: PayloadAction<AuthResponseDataType>) {
            state.signupSuccess = true
        },
        setAuthToken(state, {payload}: PayloadAction<string>) {

        },
        setLoginSuccess(state, {payload}: PayloadAction<UserModel>) {
            state.user = payload
        },
        changeFirstName(state, {payload}: PayloadAction<string>) {
            state.firstname = payload
        },
        changeLastName(state, {payload}: PayloadAction<string>) {
            state.lastname = payload
        },
        changeEmail(state, {payload}: PayloadAction<string>) {
            state.email = payload
        },
        changePassword(state, {payload}: PayloadAction<string>) {
            state.password = payload
        },
    }
})

export const {
    setLoginSuccess,
    setSignupSuccess,
    setAuthToken,
    setIsAuthStatusLoading,
    changeFirstName,
    changeLastName,
    changePassword,
    changeEmail,
    clearSignUpError,
} = authSlice.actions

export default authSlice.reducer
