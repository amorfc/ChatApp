import {UserState} from "./user-types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModel} from "../../../models/auth-model";
import {fetchUserFriends} from "./user-api";
import {showMessage} from "react-native-flash-message";
import I18nContext from "../../../config/i18n-polyglot";


export const fetchAllFriends = createAsyncThunk(
    "user/fetchAllFriends",
    async (_: any, thunkAPI: any) => {
        thunkAPI.dispatch(setFriendsStatusLoading(true))
        try {
            const fetchedAllFriendsResult = await fetchUserFriends()
            if (fetchedAllFriendsResult.status === 200) {
                thunkAPI.dispatch(setFriends(fetchedAllFriendsResult.data))
            }else{
                showMessage({
                    message:"Oops!!!",
                    description:I18nContext.polyglot?.t("something_went_wrong"),
                    type:"danger"
                })
            }
        } catch (e) {
            console.log(e)
        }
        thunkAPI.dispatch(setFriendsStatusLoading(false))
    }
)

const initialState: UserState = {
    friends: [],
    isFriendsStatusLoading:false,
    isUserConnected: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setFriends(state, {payload}: PayloadAction<Array<UserModel>>) {
            state.friends = payload
        },
        setFriendsStatusLoading(state, {payload}: PayloadAction<boolean>){
            state.isFriendsStatusLoading = payload
        },
        setUserConnection(state, {payload}:PayloadAction<boolean>){
            state.isUserConnected = payload
        }
    }
})


export const {
    setFriends,
    setFriendsStatusLoading,
    setUserConnection
} = userSlice.actions

export default userSlice.reducer
