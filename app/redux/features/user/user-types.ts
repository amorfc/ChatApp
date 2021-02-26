import {UserModel} from "../../../models/auth-model";

export type UserStateType = {
    friends:UserModel[],
    isFriendsStatusLoading:boolean,
    isUserConnected:boolean
}
