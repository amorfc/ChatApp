import {createSlice, PayloadAction} from "@reduxjs/toolkit"


const initialState = {
    firstname:"amorf",
    lastname:"",
    email:"",
    password:""
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthToken(state, {payload}:PayloadAction<string>){

        }
    }
})


export default authSlice.reducer
