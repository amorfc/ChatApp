import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatStateType} from "./chat-types";
import * as signalR from "@microsoft/signalr";
import {chat_api_connection} from "./chat-api";
import {GlobalConstants} from "../../../config/global-constans";
import {useDispatch} from "react-redux";
import {temp_env_backend_url} from "../auth/auth-api";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl(`http://${temp_env_backend_url}:8038/messagehub`, {
        accessTokenFactory(): string | Promise<string> {
            console.log(GlobalConstants.authToken)
            return GlobalConstants.authToken
        }
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

async function start() {
    try {
        console.log(GlobalConstants.authToken)

        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
    }
};

connection.onclose(start);

// Start the connection.

export const doConnection = createAsyncThunk(
    'chat/doConnection',
    async (_: any, thunkAPI: any) => {

        // const connection: HubConnection = chat_api_connection()
        try {
            await start();
            connection.on("ReceiveMessage",(Message)=>{
                console.log(Message)
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
    async (message: string, thunkAPI: any) => {
        await connection.invoke("SendPrivateMessage", {
            Message: message,
            ReceiverUser: "1111",
        })
        thunkAPI.dispatch(clearMessage(null))
    }
)

//Receive Messages Handling
// export const doReceiveMessage = createAsyncThunk(
//     'chat/doReceiveMessage',
//     async (_: any, thunkAPI: any) => {
//         await connection.on("ReceiveMessage",(messageObject)=>{
//             console.log(messageObject.content)
//             thunkAPI.dispatch(setReceiveMessage(messageObject))
//         })
//     }
// )


const initialState: ChatStateType = {
    isConnected: false,
    message: "",
    allChatMessages: []
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
            state.allChatMessages.push(payload)
        }
    }
})


export const {
    setSignalRConnectionFailure,
    setSignalRConnectionSuccess,
    changeMessage,
    clearMessage,
    setReceiveMessage
} = chatSlice.actions


export default chatSlice.reducer
