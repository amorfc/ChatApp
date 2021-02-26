import {UserModel} from "../../../models/auth-model";

export type UserState = {
    friends:UserModel[],
    isFriendsStatusLoading:boolean,
    isUserConnected:boolean
}
