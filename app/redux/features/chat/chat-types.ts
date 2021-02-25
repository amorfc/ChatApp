import {UserModel} from "../../../models/auth-model";
import {MessageModel} from "../../../models/message-model";

export type ChatStateType = {
    isConnected:boolean,
    message:string,
    allMessagesForSelectedChat:Array<MessageModel>,
}
