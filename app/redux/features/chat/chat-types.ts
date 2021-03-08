import {UserModel} from "../../../models/auth-model";
import {MessageModel} from "../../../models/message-model";
import { Chat } from "../../../types/Chat";
import { Friend } from "../../../types/Friend";
import { MessageType } from "../../../types/MessageType";

export type ChatStateType = {
    isMessageServiceConnectionLoading:boolean
    isMessageServiceConnected:boolean,
    message:string,
    allMessagesForSelectedChat:MessageType[],
    chatType:string,
    activeChatFriend:Friend,
    activeChat:Chat
}

export type SenderMessageType = {
    Message:string,
    ReceiverUser:string
}
