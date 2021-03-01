import {UserModel} from "../../../models/auth-model";
import {MessageModel} from "../../../models/message-model";
import { Chat } from "../../../types/Chat";
import { Friend } from "../../../types/Friend";
import { Message } from "../../../types/Message";

export type ChatStateType = {
    isConnected:boolean,
    message:string,
    allMessagesForSelectedChat:Message[],
    chatType:string,
    activeChatFriend:Friend,
    activeChat:Chat
}

export type SenderMessageType = {
    content:string,
    messageType:string,
    receiverName:string
}
