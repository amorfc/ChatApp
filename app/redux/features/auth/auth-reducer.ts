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
                thunkAPI.dispatch(setSignupSuccess(true))
                showMessage({
                    message: "Welcome",
                    description: "Welcome Happy Chatting",
                    type: "success"
                })
            } else {
                //Api response status not 200
                //Error message will handle
                showMessage({
                    message: "Oops!!",
                    description: "Something Went Wrong Try Again",
                    type: "danger"
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
        // -------------
        //Validation Could Happen Here

        // -------------

        const loginReqBody = {
            "Username": email,
            "Password": password
        }

        try {
            thunkAPI.dispatch(setIsAuthStatusLoading(true))
            //Login Request
            const loginResult: AxiosResponse<AuthResponseDataType> = await auth_api_login(loginReqBody)

            //Check If Login Status 200

            if (loginResult.status === 200) {

                //creatingUserModel For Now
                switch (loginResult.data.message) {
                    case "UserNotExists":
                        showMessage({
                            message:"Oops!!!",
                            description:"User Not Exists Please Sign Up",
                            type:"danger"
                        })
                        break;
                    case "PasswordIsNotCorrect":
                        showMessage({
                            message:"Oops!!!",
                            description:"Password Is Not Correct",
                            type:"danger"
                        })
                        break;
                    default:
                        loginResult.data.user = {
                            email: email
                        }

                        thunkAPI.dispatch(setUser(loginResult.data.user))
                        showMessage({
                            message: "Welcome",
                            description: `Welcome ${email}`,
                            type: "success"
                        })
                }
            }
        } catch (e) {
            showMessage({
                message: "Oops!",
                description: `Something Went Wrong!!! ${e}`,
                type: "danger"
            })
        }
        thunkAPI.dispatch(setIsAuthStatusLoading(false))
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

        },
        setUser(state, {payload}: PayloadAction<UserModel>) {
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
    setUser,
    setSignupSuccess,
    setAuthToken,
    setIsAuthStatusLoading,
    changeFirstName,
    changeLastName,
    changePassword,
    changeEmail,
    clearSignUpError,
    clearSignUpForm,
} = authSlice.actions

export default authSlice.reducer
