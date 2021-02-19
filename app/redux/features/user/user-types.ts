import {UserModel} from "../../../models/auth-model";

export type UserState = {
    friends:Array<UserModel> | Array<null>,
    isFriendsStatusLoading:boolean,
    isUserConnected:boolean
}
