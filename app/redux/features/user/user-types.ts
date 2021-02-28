import {UserModel} from "../../../models/auth-model";
import { Friend } from "../../../types/Friend";

export type UserStateType = {
    friends:Friend[],
    chats:Chat[],
    isFriendsStatusLoading:boolean,
    isUserConnected:boolean
}
