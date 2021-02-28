import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatStateType, SenderMessageType} from "./chat-types";
import * as signalR from "@microsoft/signalr";
import {chat_api_connection} from "./chat-api";
import {GlobalConstants} from "../../../config/global-constans";
import {useDispatch} from "react-redux";
import {temp_env_backend_url} from "../auth/auth-api";
import {MessageModel} from "../../../models/message-model";
import { Friend } from "../../../types/Friend";

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
            connection.on("ReceiveMessage",(Message)=>{
                thunkAPI.dispatch(addMessageToSelectedChat(Message))
            })
            thunkAPI.dispatch(setSignalRConnectionSuccess(null))
        } catch (e) {
            console.log(e)
            thunkAPI.dispatch(setSignalRConnectionFailure(null))
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
    activeChatFriend:{
        friend_id:null,
        has_active_chat:0,
        firstName:"default",
        lastName:"default",
        email:"default",
        username:"default",
    },
    message: "",
    allMessagesForSelectedChat: [],
    chatType:"SendPrivateMessage"
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSignalRConnectionSuccess(state, {payload}: PayloadAction<any>) {
            state.isConnected = true
        },
        setSignalRConnectionFailure(state, {payload}: PayloadAction<any>) {
            state.isConnected = false
        },
        changeMessage(state, {payload}: PayloadAction<string>) {
            state.message = payload
        },
        clearMessage(state, {payload}: PayloadAction<null>) {
            state.message = ""
        },
        setReceiveMessage(state, {payload}: PayloadAction<any>) {
            state.allMessagesForSelectedChat.push(payload)
        },
        closeSignalRConnection(state, {payload}:PayloadAction<null>){
            state.isConnected = false
        },
        addMessageToSelectedChat(state, {payload}:PayloadAction<MessageModel>){
            state.allMessagesForSelectedChat.push(payload)
        },
        setActiveChatFriend(state, {payload}:PayloadAction<Friend>){
            state.activeChatFriend = payload;
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
    setActiveChatFriend
} = chatSlice.actions


export default chatSlice.reducer
