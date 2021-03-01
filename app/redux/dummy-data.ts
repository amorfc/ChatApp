import {UserModel} from "../models/auth-model"
import {AxiosRequestConfig, AxiosResponse} from "axios";
import { Friend } from "../types/Friend";


const createRandomFriend = (): Friend => {

    const rndNumber = Math.random() * 1000

    return {
        friend_id:null,
        firstName: "Fatih",
        lastName: "Berlin",
        email: "likya@gmail.com",
        username: rndNumber.toString(),
        has_active_chat:0
    }
}

export const getDummyFriendsData = (): Promise<AxiosResponse<Friend[]>> => {

    const dummy_friends: Friend[] = []

    for (let i = 0; i < 40; i++) dummy_friends.push(createRandomFriend())

    return new Promise((resolve, reject) => {
        try {

            setTimeout(() => {
                // @ts-ignore
                const axiosRes: AxiosResponse = {
                    data: dummy_friends,
                    status: 200,
                    statusText: "Here",
                    headers: "",
                    config: "",
                    request: "",
                }

                resolve(axiosRes)
            },0)
        } catch (e) {

        }
    })
}
