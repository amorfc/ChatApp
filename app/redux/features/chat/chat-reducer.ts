import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatStateType, SenderMessageType} from "./chat-types";
import * as signalR from "@microsoft/signalr";
import {GlobalConstants} from "../../../config/global-constans";
import {temp_env_backend_url} from "../auth/auth-api";
import {Friend} from "../../../types/Friend";
import {sqliteDatabase} from "../../../database/Database";
import {Chat} from "../../../types/Chat";
import {Message} from "../../../types/Message";
import {refreshChats, setUserConnection} from "../user/user-reducer";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl(`http://${temp_env_backend_url}:8038/messagehub`, {
        accessTokenFactory(): string | Promise<string> {
            return GlobalConstants.authToken
        }
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

async function start(resultHandler: { (result: boolean): void; (arg0: boolean): void; }) {
    try {
        await connection.start();
        console.log("SignalR Connected.");
        resultHandler(true)
    } catch (err) {
        console.log(err);
        resultHandler(false)
    }
}

// Start the connection.

export const addMessageToDb = createAsyncThunk(
    'chat/addMessageToDb',
    async (message: any, thunkAPI: any) => {
        const {content, senderUsername, receiverUsername, timeToSend, id} = message
        const globalState = thunkAPI.getState()
        const userUsername = globalState.auth.user.username
        let targetFriend: Friend;
        try {

            targetFriend = message.receiverUsername !== userUsername ?
                    await sqliteDatabase.getSingleFriendWithUsername(receiverUsername)
                :
                    await sqliteDatabase.getSingleFriendWithUsername(senderUsername)

            const targetChat: Chat = await sqliteDatabase.getSingleChatWithFriendId(targetFriend.friend_id)

            const newMessage: Message = {
                message_id: 0,
                content,
                chat_id: targetChat.chat_id,
                senderUsername,
                receiverUsername,
                timeToSend,
                id
            }

            await sqliteDatabase.createMessage(newMessage)

        } catch (error) {
            console.warn(error)
        }
    }
)

export const doConnection = createAsyncThunk(
    'chat/doConnection',
    async (_: any, thunkAPI: any) => {

        const resultHandler = (result:boolean)=>{
            if(result){

            thunkAPI.dispatch(setUserConnection(true))
            thunkAPI.dispatch(setSignalRConnectionSuccess(null))
                return
            }

            thunkAPI.dispatch(setSignalRConnectionFailure(null))

        }

        // const connection: HubConnection = chat_api_connection()
        try {
            const connectionResult = await start(resultHandler);
            // connection.on("ReceiveMessage", (Message) => {
            //     thunkAPI.dispatch(addMessageToDb(Message))
            //     thunkAPI.dispatch(setReceiveMessage(Message))
            // })
        } catch (e) {
            console.log(e)
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

            const activeChat = await sqliteDatabase.getSingleChatWithFriendId(friend.friend_id)
            thunkAPI.dispatch(setActiveChat(activeChat))

        } catch (error) {

        }
    }
)

export const chatProcess = createAsyncThunk(
    'chat/chatProcess',
    async (friend_id: number, thunkAPI: any) => {


        try {
            const friendRes: Friend = await sqliteDatabase.getSingleFriendWithFriendId(friend_id)


            if (friendRes.has_active_chat == 0) {
                //Init Chat
                const newChat: Chat = {
                    chat_id: 0,
                    friend_id,
                    text: ""
                }

                await sqliteDatabase.createChat(newChat)

                //First of all Create Chat To Make Friend Active Chat 1
                const activeChat = await sqliteDatabase.getSingleChatWithFriendId(friend_id)
                thunkAPI.dispatch(setActiveChat(activeChat))

                const friendRes: Friend = await sqliteDatabase.getSingleFriendWithFriendId(friend_id)
                thunkAPI.dispatch(setActiveChatFriend(friendRes))
                thunkAPI.dispatch(refreshChats(null))
            } else {
                //Fetch Db Chat
                const friendRes: Friend = await sqliteDatabase.getSingleFriendWithFriendId(friend_id)
                thunkAPI.dispatch(setActiveChatFriend(friendRes))

                const activeChat = await sqliteDatabase.getSingleChatWithFriendId(friend_id)

                thunkAPI.dispatch(setActiveChat(activeChat))
                thunkAPI.dispatch(getChatMessagesFromDb(null))
            }
        } catch (error) {

        }
    }
)

export const getChatMessagesFromDb = createAsyncThunk(
    'chat/getChatMessagesFromDb',
    async (_: any, thunkAPI: any) => {

        const globalState = thunkAPI.getState()
        const activeChat = globalState.chat.activeChat


        try {
            const allActiveChatMessages = await sqliteDatabase.getAllMessages(activeChat)
            thunkAPI.dispatch(setAllMessages(allActiveChatMessages))

        } catch (error) {
            console.error(error)
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
            state.allMessagesForSelectedChat.unshift(payload)
        },
        closeSignalRConnection(state, {payload}: PayloadAction<null>) {
            state.isConnected = false
        },
        setActiveChatFriend(state, {payload}: PayloadAction<Friend>) {
            state.activeChatFriend = payload;
        },
        setActiveChat(state, {payload}: PayloadAction<Chat>) {
            state.activeChat = payload
        },
        setAllMessages(state, {payload}: PayloadAction<Message[]>) {
            state.allMessagesForSelectedChat = payload
        }
    },
})


export const {
    setSignalRConnectionFailure,
    setSignalRConnectionSuccess,
    changeMessage,
    clearMessage,
    setReceiveMessage,
    closeSignalRConnection,
    setActiveChatFriend,
    setActiveChat,
    setAllMessages
} = chatSlice.actions


export default chatSlice.reducer
