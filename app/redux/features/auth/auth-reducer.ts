import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthState} from "./auth-types";
import {navigate} from "../../../navigation/navigation";


const initialState: AuthState = {
    firstname: "amorf",
    lastname: "",
    email: "fatihermetin@gmail.com",
    password: "",
    signupHasError: false,
    signupErrorMessage: undefined,
    signupSuccess: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
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
    setAuthToken,
    changeFirstName,
    changeLastName,
    changePassword,
    changeEmail,
} = authSlice.actions

export default authSlice.reducer
