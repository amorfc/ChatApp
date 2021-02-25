//Optionally get User Friends with Id or Username
import {UserModel} from "../../../models/auth-model";
import {getDummyFriendsData} from "../../dummy-data";
import {AxiosResponse} from "axios";

export const fetchUserFriends = async ():Promise<AxiosResponse<Array<UserModel>>> => {
    return  await getDummyFriendsData()
}
