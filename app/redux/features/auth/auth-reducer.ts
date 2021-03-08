import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthError, AuthStateType, UserCredentials} from "./auth-types";
import {UserModel} from "../../../models/auth-model";

//Storage import (AsyncStorage)
import LocalStorage from "../../../config/storage"
import {GlobalConstants} from "../../../config/global-constans";
import {LoginResponse} from "../../../models/LoginModels/LoginResponse";
import {BackendClient} from "../../../services/BackendClient";
import {
    showErrorOccurredMessage,
    showLoggedUserMessage,
    showLoginUserUnsuccessfulMessage, showLogoutMessage, showSignUpSuccessMessage, showSignUpUnSuccessfulMessage
} from "../../../services/DialogMessageService";
import {SignUpResponse} from "../../../models/SingUpModels/SignUpResponse";
import { setMessageServiceConnection} from "../chat/chat-reducer";


const LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY = "user-credentials"

export const signUpAT = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
    'auth/signUpAT', async (newUserCredentials: UserCredentials, thunkAPI: any): Promise<void> => {
        //Loading State
        thunkAPI.dispatch(setIsAuthStatusLoading(true))
        try {

            const signUpResult: SignUpResponse = await BackendClient.signUp(newUserCredentials)
            console.log(signUpResult)
            if (signUpResult.isSignUpSuccessful) {
                showSignUpSuccessMessage()
                thunkAPI.dispatch(setSignupSuccess(true))
            }else{showSignUpUnSuccessfulMessage()}
        } catch (e) {
            console.log(e)
            showErrorOccurredMessage()
        }
        thunkAPI.dispatch(setIsAuthStatusLoading(false))
    })

export const loginAT = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
    'auth/loginAT',
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

const deleteUserCredentialsFromLocalStorage = async ()=>{
    try{
        await LocalStorage.remove({
            key: LOCAL_STORAGE_USER_CREDENTIALS_INFO_KEY
        })
    }catch (e) {
        console.log("e")
    }
}

export const initAuthAT = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    'auth/initAuthAT',
    async (_: any, thunkAPI: any) => {
        //Check if any auth data in async storage if Token Not expired set User and Do Auth

        try {
            //Get auth data if not expired
            const storedUserCredentials:UserCredentials | undefined = await getUserCredentialsFromLocalStorage()
            console.log(storedUserCredentials)
            storedUserCredentials ? thunkAPI.dispatch(loginAT(storedUserCredentials)):null

        } catch (e) {
            console.log(e)
        }
    })

export const logoutAT = createAsyncThunk<any, any, { rejectValue: AuthError }>(
    "auth/logoutAT",
    async (_: any, thunkAPI: any) => {

        try{
            const {auth}:{auth:AuthStateType} = thunkAPI.getState()
            auth?.user ? showLogoutMessage(auth.user.username):null
            //Delete user from Global Redux State
            thunkAPI.dispatch(setAuthenticatedUser(undefined))
            thunkAPI.dispatch(setMessageServiceConnection(false))
            // await connection.stop()
            //Delete token from Local Storage
            await deleteUserCredentialsFromLocalStorage()

        }catch (e) {
            console.log(e)
        }

    }
)

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
        setAuthenticatedUser(state, {payload}: PayloadAction<UserModel | undefined>) {
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
