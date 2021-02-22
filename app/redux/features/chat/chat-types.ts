import {UserModel} from "../../../models/auth-model";

export type ChatStateType = {
    isConnected:boolean,
    message:string,
    allChatMessages:Array<any>
}
