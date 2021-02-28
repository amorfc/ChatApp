import { UserStateType } from "./user-types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../../models/auth-model";
import { fetchUserFriends } from "./user-api";
import { showMessage } from "react-native-flash-message";
import I18nContext from "../../../config/i18n-polyglot";
import { Friend } from "../../../types/Friend";
import { sqliteDatabase } from "../../../database/Database";
import { RootStateType } from "../../root-reducers";


export const addFriend = createAsyncThunk(
    "user/addFriend",
    async (newFriend: Friend, thunkAPI: any) => {
        try {
            await sqliteDatabase.createFriend({
                friend_id: null,
                firstName: newFriend.firstName,
                lastName: newFriend.lastName,
                email: newFriend.email,
                username: newFriend.username,
                has_active_chat: 0
            })
            thunkAPI.dispatch(refreshFriends(null))
        } catch (err: any) {
            console.warn(err.message)
        }
    }
)
export const fetchAllFriendsFromDb = createAsyncThunk(
    "user/fetchAllFriendsFromDb",
    async (_: any, thunkAPI: any) => {
        try {
            const friendsFromDb = await sqliteDatabase.getAllFriend()
            console.log("fetchAllFriendsFromDb")
            checkFriendsToPushReduxState(friendsFromDb, thunkAPI)
        } catch (err) {
            console.warn(err.message)
        }
    }
)
export const fetchAllFriendsFromRemote = createAsyncThunk(
    "user/fetchAllFriends",
    async (_: any, thunkAPI: any) => {
        try {
            const fetchedAllFriendsResult = await fetchUserFriends()
            if (fetchedAllFriendsResult.status === 200) {
                

                console.log(fetchedAllFriendsResult.data)
                // checkFriendsToPushReduxState(fetchedAllFriendsResult.data,thunkAPI)

            } else {
                showMessage({
                    message: "Oops!!!",
                    description: I18nContext.polyglot?.t("something_went_wrong"),
                    type: "danger"
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
)

export const refreshFriends = createAsyncThunk(
    'user/refreshFriends',
    async (_: any, thunkAPI: any) => {
        thunkAPI.dispatch(setFriendsStatusLoading(true))
        try {
            thunkAPI.dispatch(fetchAllFriendsFromDb(null))
            thunkAPI.dispatch(fetchAllFriendsFromRemote(null))
        } catch (err) {
            console.warn(err)
        }
        thunkAPI.dispatch(setFriendsStatusLoading(false))
    }
)

export const checkFriendsToPushReduxState = (newFriends: Friend[], thunkAPI: any) => {
    newFriends.forEach((dbFriend: Friend) => {
        const thunkState = thunkAPI.getState()
        let result = thunkState.user.friends.find((reduxStateFriend: Friend) => dbFriend.username == reduxStateFriend.username)
        result == undefined ? thunkAPI.dispatch(addFriends(dbFriend)) : console.log(`${dbFriend.username} is already exists in REDUX STATE`)
    })
}

const initialState: UserStateType = {
    friends: [],
    isFriendsStatusLoading: false,
    isUserConnected: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addFriends(state, { payload }: PayloadAction<Friend>) {
            state.friends.push(payload)
        },
        setFriendsStatusLoading(state, { payload }: PayloadAction<boolean>) {
            state.isFriendsStatusLoading = payload
        },
        setUserConnection(state, { payload }: PayloadAction<boolean>) {
            state.isUserConnected = payload
        }
    }
})


export const {
    addFriends,
    setFriendsStatusLoading,
    setUserConnection
} = userSlice.actions

export default userSlice.reducer
