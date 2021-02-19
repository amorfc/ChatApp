import {UserState} from "./user-types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModel} from "../../../models/auth-model";
import {fetchUserFriends} from "./user-api";


export const fetchAllFriends = createAsyncThunk(
    "user/fetchAllFriends",
    async (_:any,thunkAPI:any)=>{
        try{
            const fetchedAllFriendsResult = await fetchUserFriends()
            thunkAPI.dispatch(setFriends(fetchedAllFriendsResult.data))
        }catch (e){
            console.log(e)
        }
    }
)

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
