import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatStateType} from "./chat-types";
import * as signalR from "@microsoft/signalr";
import {chat_api_connection} from "./chat-api";
import {GlobalConstants} from "../../../config/global-constans";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.1.48:8038/messagehub",{
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
            thunkAPI.dispatch(setSignalRConnectionSuccess(null))
        } catch (e) {
            console.log(e)
            thunkAPI.dispatch(setSignalRConnectionFailure(null))
        }
    }
)



const initialState: ChatStateType = {
    isConnected: false
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
        }
    }
})


export const {
    setSignalRConnectionFailure,
    setSignalRConnectionSuccess
} = chatSlice.actions


export default chatSlice.reducer
