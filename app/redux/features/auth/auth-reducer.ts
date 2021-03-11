import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthError, AuthStateType, LoginUserCredentials} from "./auth-types";
import {UserModel} from "../../../models/auth-model";

//Storage import (AsyncStorage)
import LocalStorage from "../../../config/storage"
import {GlobalConstants} from "../../../config/global-constans";
import {LoginResponse} from "../../../models/Response/LoginResponse";
import {BackendClient} from "../../../services/MessagingServiceClient";
import {
    showErrorOccurredMessage,
    showLoggedUserMessage,
    showLoginUserUnsuccessfulMessage,
    showLogoutMessage,
    showNetworkErrorMessage,
    showSignUpSuccessMessage,
    showSignUpUnSuccessfulMessage
} from "../../../services/DialogMessageService";
import {SignUpResponse} from "../../../models/Response/SignUpResponse";
import {setMessageServiceConnection} from "../chat/chat-reducer";


const LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY = "user-credentials"

export const signUpAT = createAsyncThunk<any, LoginUserCredentials, { rejectValue: AuthError }>(
    'auth/signUpAT', async (newUserCredentials: LoginUserCredentials, thunkAPI: any): Promise<void> => {
        //Loading State
        thunkAPI.dispatch(setIsAuthStatusLoading(true))
        try {

            const signUpResult: SignUpResponse = await BackendClient.signUp(newUserCredentials)
            console.log(signUpResult)
            if (signUpResult.isSignUpSuccessful) {
                showSignUpSuccessMessage()
                thunkAPI.dispatch(setSignupSuccess(true))
            }else if(signUpResult.message == "Error: Network Error"){
                showNetworkErrorMessage()
            }
            else {
                showSignUpUnSuccessfulMessage()
            }
        } catch (e) {
            console.log(e)
            showErrorOccurredMessage()
        }
        thunkAPI.dispatch(setIsAuthStatusLoading(false))
    })

export const loginAT = createAsyncThunk<any, LoginUserCredentials, { rejectValue: AuthError }>(
    'auth/loginAT',
    async (userCredentials: LoginUserCredentials, thunkAPI: any) => {

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
            } else {
                console.log(JSON.stringify(loginResult))
                showLoginUserUnsuccessfulMessage(loginResult.message)
            }

        } catch (e) {
            console.log(`Error Occurred when user Loggin ${e} `)
            showErrorOccurredMessage()
        }
        thunkAPI.dispatch(setIsAuthStatusLoading(false))
    }
)
const setUserCredentialsToLocalStorage = async (userCredentials: LoginUserCredentials) => {

    try {
        await LocalStorage.save({
            key: LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY,
            data: userCredentials
        })
    } catch (e) {
        console.warn(`Error occurred when User Credentials saving to Local Storage ${e}`)
    }
}
const getUserCredentialsFromLocalStorage = async (): Promise<LoginUserCredentials | undefined> => {

    let userCredentials: LoginUserCredentials | undefined = undefined
    try {
        userCredentials = await LocalStorage.load({key: LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY})
    } catch (e) {
        console.warn(`Error occurred when User Credentials From to Local Storage ${e} `)
    }
    return userCredentials
}

const deleteUserCredentialsFromLocalStorage = async () => {
    try {
        await LocalStorage.remove({
            key: LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY
        })
    } catch (e) {
        console.log(`Somtehing Went Wrong Wehen Deleting User Credentials From Local Storage ${e} `)
    }
}

export const initAuthAT = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    'auth/initAuthAT',
    async (_: any, thunkAPI: any) => {
        //Check if any auth data in async storage if Token Not expired set User and Do Auth

        try {
            //Get auth data if not expired
            const storedUserCredentials: LoginUserCredentials | undefined = await getUserCredentialsFromLocalStorage()
            console.log("Stored User Credential " + storedUserCredentials)
            storedUserCredentials ? thunkAPI.dispatch(loginAT(storedUserCredentials)) : null

        } catch (e) {
            console.log(e)
        }
        thunkAPI.dispatch(setAppInitLoading(false))
    })

export const logoutAT = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    "auth/logoutAT",
    async (_: any, thunkAPI: any) => {

        try {
            const {auth}: { auth: AuthStateType } = thunkAPI.getState()
            auth?.user ? showLogoutMessage(auth.user.username) : null
            //Delete user from Global Redux State
            thunkAPI.dispatch(setAuthenticatedUser(undefined))
            thunkAPI.dispatch(setAuthToken(null))
            thunkAPI.dispatch(setMessageServiceConnection(false))
            // await connection.stop()
            //Delete token from Local Storage
            await deleteUserCredentialsFromLocalStorage()

        } catch (e) {
            console.log(e)
        }

    }
)

const initialState: AuthStateType = {
    authToken : null,
    isAppInitLoading:true,
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
        setAppInitLoading(state,{payload}:PayloadAction<boolean>){
            state.isAppInitLoading = payload
        },
        clearSignUpForm(state, {payload}: PayloadAction<any>) {
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
        setAuthToken(state, {payload}: PayloadAction<any>) {
            state.authToken = payload
            GlobalConstants.authToken = payload
        },
        setAuthenticatedUser(state, {payload}: PayloadAction<UserModel | undefined>) {
            state.user = payload
        },
    },
})

export const {
    setAuthenticatedUser,
    setSignupSuccess,
    setAuthToken,
    setIsAuthStatusLoading,
    setAppInitLoading,
    clearSignUpError,
    clearSignUpForm,
} = authSlice.actions

export default authSlice.reducer
