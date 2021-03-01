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
import { Message } from "../../../types/Message";

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

export const addMessageToDb = createAsyncThunk(
    'chat/createMessage',
    async (message: any, thunkAPI: any) => {
        const { content, senderUsername, receiverUsername, timeToSend, id } = message
        const globalState = thunkAPI.getState()
        const userUsername = globalState.auth.user.username
        try {

            if (message.receiverUsername !== userUsername) {
                
                const targetFriend: Friend = await sqliteDatabase.getSingleFriendWithUsername(receiverUsername)
                const targetChat: Chat = await sqliteDatabase.getSingleChatWithFriendId(targetFriend)
                const newMessage: Message = {
                    content,
                    chat_id: targetChat.chat_id,
                    senderUsername,
                    receiverUsername,
                    timeToSend,
                    id
                }

                await sqliteDatabase.createMessage(newMessage)

            }else{
                const targetFriend: Friend = await sqliteDatabase.getSingleFriendWithUsername(senderUsername)
                const targetChat: Chat = await sqliteDatabase.getSingleChatWithFriendId(targetFriend)
                const newMessage: Message = {
                    content,
                    chat_id: targetChat.chat_id,
                    senderUsername,
                    receiverUsername,
                    timeToSend,
                    id
                }

                await sqliteDatabase.createMessage(newMessage)
            }


        } catch (error) {
            console.warn(error)
        }
    }
)

export const doConnection = createAsyncThunk(
    'chat/doConnection',
    async (_: any, thunkAPI: any) => {

        // const connection: HubConnection = chat_api_connection()
        try {
            await start();
            connection.on("ReceiveMessage", (Message) => {
                thunkAPI.dispatch(addMessageToDb(Message))
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



        } catch (error) {

        }
    }
)

export const fetchActiveChat = createAsyncThunk(
    'chat/fetchActiveChat',
    async (friend: Friend, thunkAPI: any) => {
        try {

            const activeChat = await sqliteDatabase.getSingleChatWithFriendId(friend)
            thunkAPI.dispatch(setActiveChat(activeChat))

        } catch (error) {

        }
    }
)

export const chatProcess = createAsyncThunk(
    'chat/chatProcess',
    async (friend: Friend, thunkAPI: any) => {

        try {

            if (friend.has_active_chat == 0) {
                //Init Chat
                const newChat: Chat = {
                    chat_id: 0,
                    friend_id: friend.friend_id,
                    text: ""
                }

                await sqliteDatabase.createChat(newChat)

                //First of all Create Chat To Make Friend Active Chat 1
                const activeChat = await sqliteDatabase.getSingleChatWithFriendId(friend)
                thunkAPI.dispatch(setActiveChat(activeChat))

                const friendRes: Friend = await sqliteDatabase.getSingleFriend(friend)
                thunkAPI.dispatch(setActiveChatFriend(friendRes))

            } else {
                //Fetch Db Chat

                thunkAPI.dispatch(setActiveChatFriend(friend))

                const activeChat = await sqliteDatabase.getSingleChatWithFriendId(friend)
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
        friend_id: 0,
        has_active_chat: 0,
        firstName: "default",
        lastName: "default",
        email: "default",
        username: "default",
    },
    activeChat: {
        chat_id: 0,
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
