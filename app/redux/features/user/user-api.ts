//Optionally get User Friends with Id or Username
import {UserModel} from "../../../models/auth-model";
import {getDummyFriendsData} from "../../dummy-data";
import {AxiosResponse} from "axios";
import { Friend } from "../../../types/Friend";

export const fetchUserFriends = async ():Promise<AxiosResponse<Friend[]>> => {
    return  await getDummyFriendsData()
}
