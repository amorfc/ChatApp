import {UserModel} from "../../../models/auth-model";
import {MessageModel} from "../../../models/message-model";
import { Friend } from "../../../types/Friend";

export type ChatStateType = {
    isConnected:boolean,
    message:string,
    allMessagesForSelectedChat:Array<MessageModel>,
    chatType:string,
    activeChatFriend:Friend
}

export type SenderMessageType = {
    content:string,
    messageType:string,
    receiverName:string
}
