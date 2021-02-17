import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthError, AuthState, NewUser, UserCredentials} from "./auth-types";
import {navigate} from "../../../navigation/navigation";
import axios, {AxiosResponse} from "axios";
import {auth_api_signUp} from "./auth-api";
import {AuthResponseDataType} from "../../../models/auth-model";



export const signUpProcess = createAsyncThunk<any, NewUser, {rejectValue:AuthError}>(
    'auth/signUpProcess', async (newUser:NewUser, thunkAPI:any):Promise<void>=>{
        thunkAPI.dispatch(clearSignUpError(null))
        thunkAPI.dispatch(setIsAuthStatusLoading(true))
        //Delete All signUpErrors purpose of trying again
        // -------------
        const { firstname,lastname,email,password } = newUser
        console.log(`${firstname} , ${lastname}, ${email} , ${password}`)

        try{

            const signUpRequestBody = {
                "Username":firstname,
                "Password":password
            }

            const signUpResult = await auth_api_signUp(signUpRequestBody)

            if(signUpResult.status === 200){
                thunkAPI.dispatch(setSignupSuccess(signUpResult.data))
                thunkAPI.dispatch(setIsAuthStatusLoading(false))

            }
        }catch(e){
            thunkAPI.dispatch(setIsAuthStatusLoading(false))
            console.log(e)
        }
        //Validation Could Happen Here

        // -------------

        //Server Request Time

        //Async functions and try here

        try{
            //Do request and get response Anf Check response

        }catch (e){
            //Catch if error here

        }
})

export const loginProcess = createAsyncThunk<any, UserCredentials, {rejectValue:AuthError}>(
    'auth/loginProcess',
    async (userCredentials:UserCredentials,thunkAPI:any)=>{

        // -------------
        const { email,password } = userCredentials
        //Validation Could Happen Here

        // -------------

        //Server Request Time

        //Async functions and try here

        try{
            //Do request and get response Anf Check response

        }catch (e){
            //Catch if error here

        }
    }
)

const initAuth = createAsyncThunk<
    any,any,{rejectValue:AuthError}>(
        'auth/initAuth',
        async (_ :any, thunkAPI:any)=>{
            //Check if any auth data in async storage if Token Not expired set User and Do Auth
            try{

            }catch (e){

            }
        })

const initialState: AuthState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    signupHasError: false,
    signupErrorMessage: undefined,
    signupSuccess: false,
    isAuthStatusLoading:false,
    user:null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthStatusLoading(state, {payload}:PayloadAction<boolean>){
          state.isAuthStatusLoading = payload
        },
        clearSignUpError(state ,{payload}:PayloadAction<any>){
            state.signupHasError = false
            state.signupErrorMessage = undefined
        },
        setSignupSuccess(state, {payload}:PayloadAction<AuthResponseDataType>){
            state.signupSuccess = true
        },
        setAuthToken(state, {payload}: PayloadAction<string>) {

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
