import { UserStateType } from "./user-types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../../models/auth-model";
import { fetchUserFriends } from "./user-api";
import { showMessage } from "react-native-flash-message";
import I18nContext from "../../../config/i18n-polyglot";
import { Friend } from "../../../types/Friend";
import { sqliteDatabase } from "../../../database/Database";
import { RootStateType } from "../../root-reducers";
import { Chat } from "../../../types/Chat";
import {signalRMessageService} from "../../../services/MessageServices";


export const addFriend = createAsyncThunk(
    "user/addFriend",
    async (newFriend: Friend, thunkAPI: any) => {
        try {
            await sqliteDatabase.createFriend({
                friend_id: 0,
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
            thunkAPI.dispatch(setAllFriends(friendsFromDb))
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

export const fetchAllChats = createAsyncThunk(
    'user/getAllChats',
    async (_: any,thunkAPI:any)=>{
        try {

            const allChats = await sqliteDatabase.getAllChat()
            thunkAPI.dispatch(setAllChats(allChats))

        } catch (err) {
            console.warn(err.message)
        }
    }
)
export const refreshChats = createAsyncThunk(
    'user/refreshChats',
    async (_:any, thunkAPI:any )=>{

        thunkAPI.dispatch(setChatsStatusLoading(true))

        try {
            thunkAPI.dispatch(fetchAllChats(null))
        } catch (error) {
            console.warn(error)
        }

        thunkAPI.dispatch(setChatsStatusLoading(false))

    }
)

export const refreshFriends = createAsyncThunk(
    'user/refreshFriends',
    async (_: any, thunkAPI: any) => {
        thunkAPI.dispatch(setFriendsStatusLoading(true))
        try {
            thunkAPI.dispatch(fetchAllFriendsFromDb(null))
            // thunkAPI.dispatch(fetchAllFriendsFromRemote(null))
        } catch (err) {
            console.warn(err)
        }
        thunkAPI.dispatch(setFriendsStatusLoading(false))
    }
)

const initialState: UserStateType = {
    friends: [],
    chats:[],
    isFriendsStatusLoading: false,
    isChatsStatusLoading: false,
    isUserConnected: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAllFriends(state, { payload }: PayloadAction<Friend[]>) {
            state.friends = payload
        },
        setFriendsStatusLoading(state, { payload }: PayloadAction<boolean>) {
            state.isFriendsStatusLoading = payload
        },
        setChatsStatusLoading(state, {payload}:PayloadAction<boolean>){
            state.isChatsStatusLoading = payload
        },
        setUserConnection(state, { payload }: PayloadAction<boolean>) {
            state.isUserConnected = payload
        },
        setAllChats(state, { payload }:PayloadAction<Chat[]>){
            state.chats = payload
        }
    }
})


export const {
    setAllFriends,
    setAllChats,
    setFriendsStatusLoading,
    setChatsStatusLoading,
    setUserConnection
} = userSlice.actions

export default userSlice.reducer
