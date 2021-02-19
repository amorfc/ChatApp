import {UserState} from "./user-types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModel} from "../../../models/auth-model";


const initialState: UserState = {
    friends:[],
    isUserConnected:false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setFriends(state, {payload}:PayloadAction<Array<UserModel>>){
            state.friends = payload
        }
    }
})


export const {
    setFriends
} = userSlice.actions

export default userSlice.reducer
