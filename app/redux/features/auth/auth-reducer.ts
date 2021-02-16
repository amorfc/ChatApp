import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AuthState} from "./auth-types";
import {navigate} from "../../../navigation/navigation";


const initialState: AuthState = {
    firstname: "amorf",
    lastname: "",
    email: "",
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

        },
        changeLastName(state, {payload}: PayloadAction<string>) {

        },
        changeEmail(state, {payload}: PayloadAction<string>) {

        },
        changePassword(state, {payload}: PayloadAction<string>) {

        },
    }
})

export const {
    setAuthToken
} = authSlice.actions

export default authSlice.reducer
