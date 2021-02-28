import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatStateType, SenderMessageType } from "./chat-types";
import * as signalR from "@microsoft/signalr";
import { chat_api_connection } from "./chat-api";
import { GlobalConstants } from "../../../config/global-constans";
import { useDispatch } from "react-redux";
import { temp_env_backend_url } from "../auth/auth-api";
import { MessageModel } from "../../../models/message-model";
import { Friend } from "../../../types/Friend";
import { sqliteDatabase } from "../../../database/Database";
import { Chat } from "../../../types/Chat";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl(`http://${temp_env_backend_url}:8038/messagehub`, {
        accessTokenFactory(): string | Promise<string> {
            return GlobalConstants.authToken
        }
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
    }
}

// Start the connection.

export const doConnection = createAsyncThunk(
    'chat/doConnection',
    async (_: any, thunkAPI: any) => {

        // const connection: HubConnection = chat_api_connection()
        try {
            await start();
            connection.on("ReceiveMessage", (Message) => {
                thunkAPI.dispatch(addMessageToSelectedChat(Message))
            })
            thunkAPI.dispatch(setSignalRConnectionSuccess(null))
        } catch (e) {
            console.log(e)
            thunkAPI.dispatch(setSignalRConnectionFailure(null))
        }
    }
)

export const initChat = createAsyncThunk(
    'chat/createChat',
    async (friend: Friend, thunkAPI: any) => {
        try {

            const newChat: Chat = {
                chat_id: null,
                friend_id: friend.friend_id,
                text: ""
            }

            await sqliteDatabase.createChat(newChat)

        } catch (error) {

        }
    }
)
export const chatProcess = createAsyncThunk(
    'chat/chatProcess',
    async (_: any, thunkAPI: any) => {

        const state = thunkAPI.getState()
        const activeFriend = state.chat.activeChatFriend 

        try {

            if (activeFriend.has_active_chat == 0) {
                //Init Chat
                thunkAPI.dispatch(initChat(activeFriend));
                const friendRes: Friend = await sqliteDatabase.getSingleFriend(activeFriend)
                thunkAPI.dispatch(setActiveChatFriend(friendRes))
                const activeChat = await sqliteDatabase.getSingleChat(activeFriend)
                thunkAPI.dispatch(setActiveChat(activeChat))

            } else {
                //Fetch Db Chat
                const activeChat = await sqliteDatabase.getSingleChat(activeFriend)
                const friendRes: Friend = await sqliteDatabase.getSingleFriend(activeFriend)
                thunkAPI.dispatch(setActiveChatFriend(friendRes))
                thunkAPI.dispatch(setActiveChat(activeChat))
            }
        } catch (error) {

        }
    }
)
export const getChatMessagesFromDb = createAsyncThunk(
    'chat/getChatMessagesFromDb',
    async (chat: Chat, thunkAPI: any) => {
        try {
            // sqliteDatabase.createChat()
        } catch (error) {

        }
    }
)

export const doSendMessage = createAsyncThunk(
    'chat/doSendMessage',
    async (Message: SenderMessageType, thunkAPI: any) => {
        await connection.invoke(Message.messageType, {
            Message: Message.content,
            ReceiverUser: Message.receiverName,
        })
        thunkAPI.dispatch(clearMessage(null))
    }
)


const initialState: ChatStateType = {
    isConnected: false,
    activeChatFriend: {
        friend_id: null,
        has_active_chat: 0,
        firstName: "default",
        lastName: "default",
        email: "default",
        username: "default",
    },
    activeChat: {
        chat_id: null,
        friend_id: null,
        text: ""
    },
    message: "",
    allMessagesForSelectedChat: [],
    chatType: "SendPrivateMessage"
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSignalRConnectionSuccess(state, { payload }: PayloadAction<any>) {
            state.isConnected = true
        },
        setSignalRConnectionFailure(state, { payload }: PayloadAction<any>) {
            state.isConnected = false
        },
        changeMessage(state, { payload }: PayloadAction<string>) {
            state.message = payload
        },
        clearMessage(state, { payload }: PayloadAction<null>) {
            state.message = ""
        },
        setReceiveMessage(state, { payload }: PayloadAction<any>) {
            state.allMessagesForSelectedChat.push(payload)
        },
        closeSignalRConnection(state, { payload }: PayloadAction<null>) {
            state.isConnected = false
        },
        addMessageToSelectedChat(state, { payload }: PayloadAction<MessageModel>) {
            state.allMessagesForSelectedChat.push(payload)
        },
        setActiveChatFriend(state, { payload }: PayloadAction<Friend>) {
            state.activeChatFriend = payload;
        },
        setActiveChat(state, { payload }: PayloadAction<Chat>) {
            state.activeChat = payload
        }
    }
})


export const {
    setSignalRConnectionFailure,
    setSignalRConnectionSuccess,
    changeMessage,
    clearMessage,
    setReceiveMessage,
    closeSignalRConnection,
    addMessageToSelectedChat,
    setActiveChatFriend,
    setActiveChat
} = chatSlice.actions


export default chatSlice.reducer
