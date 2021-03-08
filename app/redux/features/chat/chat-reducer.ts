import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatStateType, SenderMessageType} from "./chat-types";
import * as signalR from "@microsoft/signalr";
import {GlobalConstants} from "../../../config/global-constans";
import {temp_env_backend_url} from "../auth/auth-api";
import {Friend} from "../../../types/Friend";
import {sqliteDatabase} from "../../../database/Database";
import {Chat} from "../../../types/Chat";
import {MessageType} from "../../../types/MessageType";
import {refreshChatsAT, setUserConnection} from "../user/user-reducer";
import {RootStateType} from "../../root-reducers";
import {signalRMessageService} from "../../../services/MessageServices";
import {SEND_PRIVATE_MESSAGE_NAME} from "../../../database/Constants";
import store from "../../configure-store";
import active_chat from "../../../containers/chats/active_chat";
import {MessageDomainType} from "../../../types/MessageDomainType";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl(`http://${temp_env_backend_url}:8038/messagehub`, {
        accessTokenFactory(): string | Promise<string> {
            return GlobalConstants.authToken
        }
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();


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

            const newMessage: MessageDomainType = {
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

const receiveMessageHandler = async(message:MessageType)=>{
    try{




    }catch (e) {
        console.warn(`Message Receive But Error Occured -> Error ${e}`)
    }
}

const checkIfGroupMessage = () => {

    return
}

export const doMessageServiceConnectionAT = createAsyncThunk(
    'chat/doMessageServiceConnectionAT',
    async (_: any, thunkAPI: any) => {
        thunkAPI.dispatch(setMessageServiceConnectionLoading(true))
        const {auth:AuthState} = thunkAPI.getState()
        const isUserAuthenticated = AuthState.user

        try {
            if (isUserAuthenticated) {
                signalRMessageService.setReceiveMessageHandler(receiveMessageHandler)
                thunkAPI.dispatch(setUserConnection(true))
                thunkAPI.dispatch(setMessageServiceConnection(true))
            }
        } catch (e) {
            thunkAPI.dispatch(setMessageServiceConnection(false))
        }
        thunkAPI.dispatch(setMessageServiceConnectionLoading(false))
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
                thunkAPI.dispatch(refreshChatsAT(null))
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
    async (senderMessage: SenderMessageType, thunkAPI: any) => {

        const state: RootStateType = thunkAPI.getState()

        try{

            switch (state.chat.chatType){
                case SEND_PRIVATE_MESSAGE_NAME:{
                    signalRMessageService.sendPrivateMessage(senderMessage,null)
                    break
                }
                default:{

                }
            }

        }catch (e) {
            console.warn(`Message Could not Send Occurred Erro -> ${e}`)
        }
        thunkAPI.dispatch(clearMessage(null))
    }
)


const initialState: ChatStateType = {
    isMessageServiceConnectionLoading:false,
    isMessageServiceConnected: false,
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
        setMessageServiceConnectionLoading(state,{payload}:PayloadAction<boolean>){
           state.isMessageServiceConnected = payload
        },
        setMessageServiceConnection(state, {payload}: PayloadAction<boolean>) {
            state.isMessageServiceConnected = payload
        },
        changeMessage(state, {payload}: PayloadAction<string>) {
            state.message = payload
        },
        clearMessage(state, {payload}: PayloadAction<null>) {
            state.message = ""
        },
        addActiveChatReceiveMessage(state, {payload}: PayloadAction<any>) {
            state.allMessagesForSelectedChat.unshift(payload)
        },
        closeSignalRConnection(state, {payload}: PayloadAction<null>) {
            state.isMessageServiceConnected = false
        },
        setActiveChatFriend(state, {payload}: PayloadAction<Friend>) {
            state.activeChatFriend = payload;
        },
        setActiveChat(state, {payload}: PayloadAction<Chat>) {
            state.activeChat = payload
        },
        setAllMessages(state, {payload}: PayloadAction<MessageType[]>) {
            state.allMessagesForSelectedChat = payload
        }
    },
})


export const {
    setMessageServiceConnectionLoading,
    setMessageServiceConnection,
    changeMessage,
    clearMessage,
    addActiveChatReceiveMessage,
    closeSignalRConnection,
    setActiveChatFriend,
    setActiveChat,
    setAllMessages
} = chatSlice.actions


export default chatSlice.reducer
