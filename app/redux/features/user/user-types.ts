import {UserModel} from "../../../models/auth-model";
import { Chat } from "../../../types/Chat";
import { Friend } from "../../../types/Friend";

export type UserStateType = {
    friends:Friend[],
    chats:Chat[],
    isFriendsStatusLoading:boolean,
    isChatsStatusLoading:boolean,
    isUserConnected:boolean
}
