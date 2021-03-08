import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthError, AuthStateType, NewUser, User, UserCredentials} from "./auth-types";
import {auth_api_signUp} from "./auth-api";
import {AuthResponseDataType, UserModel} from "../../../models/auth-model";
import {showMessage} from "react-native-flash-message";

//Storage import (AsyncStorage)
import LocalStorage from "../../../config/storage"
import {GlobalConstants} from "../../../config/global-constans";
import I18nContext from "../../../config/i18n-polyglot";
import {LoginResponse} from "../../../models/LoginModels/LoginResponse";
import {BackendClient} from "../../../services/BackendClient";
import {
    showErrorOccurredMessage,
    showLoggedUserMessage,
    showLoginUserUnsuccessfulMessage, showSignUpSuccessMessage, showSignUpUnSuccessfulMessage
} from "../../../services/DialogMessageService";
import {SignUpResponse} from "../../../models/SingUpModels/SignUpResponse";


const LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY = "user-credentials"

export const signUpProcess = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
    'auth/signUpProcess', async (newUserCredentials: UserCredentials, thunkAPI: any): Promise<void> => {
        //Loading State
        thunkAPI.dispatch(setIsAuthStatusLoading(true))
        const {username} = newUserCredentials
        try {

            const signUpResult: SignUpResponse = await BackendClient.signUp(newUserCredentials)

            if (signUpResult.isSignUpSuccessful) {
                showSignUpSuccessMessage(username)
                return
            }

            showSignUpUnSuccessfulMessage()

        } catch (e) {
            console.log(e)
            showErrorOccurredMessage()
        }
        thunkAPI.dispatch(setIsAuthStatusLoading(false))
    })

export const loginProcess = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
    'auth/loginProcess',
    async (userCredentials: UserCredentials, thunkAPI: any) => {

        const {username} = userCredentials

        thunkAPI.dispatch(setIsAuthStatusLoading(true))

        try {
            //Login Request
            const loginResult: LoginResponse = await BackendClient.login(userCredentials)
            //Check If Login Success
            if (loginResult.isAuthenticated) {
                const currentUser: UserModel = {
                    username
                }
                thunkAPI.dispatch(setAuthenticatedUser(currentUser))
                thunkAPI.dispatch(setAuthToken(loginResult.token))
                await setUserCredentialsToLocalStorage(userCredentials)
                showLoggedUserMessage(currentUser)
                return
            }

            showLoginUserUnsuccessfulMessage(loginResult.message)

        } catch (e) {
            console.log(`Error Occurred when user Loggin ${e} `)
            showErrorOccurredMessage()
        }
        thunkAPI.dispatch(setIsAuthStatusLoading(false))
    }
)
const setUserCredentialsToLocalStorage = async (userCredentials: UserCredentials) => {

    try {
        await LocalStorage.save({
            key: LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY,
            data: userCredentials
        })
    } catch (e) {
        console.warn(`Error occurred when User Credentials saving to Local Storage ${e}`)
    }
}
const getUserCredentialsFromLocalStorage = async (): Promise<UserCredentials | undefined> => {

    let userCredentials: UserCredentials | undefined = undefined
    try {
        userCredentials = await LocalStorage.load({key: LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY})
    } catch (e) {
        console.warn(`Error occurred when User Credentials From to Local Storage ${e} `)
    }
    return userCredentials
}

export const initAuth = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    'auth/initAuth',
    async (_: any, thunkAPI: any) => {
        //Check if any auth data in async storage if Token Not expired set User and Do Auth

        try {
            //Get auth data if not expired
            const authData: AuthResponseDataType = await LocalStorage.load({
                key: "authData"
            })

            if (authData) {
                thunkAPI.dispatch(loginProcess(authData.user))
            }
        } catch (e) {
            console.log(e)
        }
    })

// export const logoutProcess = createAsyncThunk<any, any, { rejectValue: AuthError }>(
//     "auth/logoutProcess",
//     async (_: any, thunkAPI: any) => {
//
//         try{
//             const state = thunkAPI.getState()
//
//             showMessage({
//                 message:"Oops!!!",
//                 description:I18nContext.polyglot?.t("log_out_message",{name:state.auth.user.username}),
//                 type:"warning"
//             })
//             //Delete user from Global Redux State
//             thunkAPI.dispatch(setUser(null))
//             thunkAPI.dispatch(setUserConnection(false))
//             await connection.stop()
//             connection.off("ReceiveMessage")
//             thunkAPI.dispatch(closeSignalRConnection(null))
//             //Delete token from Local Storage
//             await LocalStorage.remove({
//                 key: "authData"
//             })
//
//         }catch (e) {
//             console.log(e)
//         }
//
//     }
// )

const initialState: AuthStateType = {
    //Form State
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    //signUp Information
    signupHasError: false,
    signupErrorMessage: undefined,
    signupSuccess: false,
    //Login Information
    loginHasError: false,
    loginErrorMessage: undefined,
    //Loader Information
    isAuthStatusLoading: false,
    //Result Information
    user: undefined
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthStatusLoading(state, {payload}: PayloadAction<boolean>) {
            state.isAuthStatusLoading = payload
        },
        clearSignUpForm(state, {payload}: PayloadAction<any>) {
            state.firstname = ""
            state.lastname = ""
            state.email = ""
            state.password = ""
            state.signupSuccess = false
        }
        ,
        clearSignUpError(state, {payload}: PayloadAction<any>) {
            state.signupHasError = false
            state.signupErrorMessage = undefined
        },
        setSignupSuccess(state, {payload}: PayloadAction<boolean>) {
            state.signupSuccess = payload
        },
        setAuthToken(state, {payload}: PayloadAction<string>) {
            GlobalConstants.authToken = payload
        },
        setAuthenticatedUser(state, {payload}: PayloadAction<UserModel>) {
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
        changeUsername(state, {payload}: PayloadAction<string>) {
            state.username = payload
        },
    }
})

export const {
    setAuthenticatedUser,
    setSignupSuccess,
    setAuthToken,
    setIsAuthStatusLoading,
    changeFirstName,
    changeLastName,
    changePassword,
    changeEmail,
    changeUsername,
    clearSignUpError,
    clearSignUpForm,
} = authSlice.actions

export default authSlice.reducer
