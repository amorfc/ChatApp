import {UserModel} from "../models/auth-model"
import {AxiosRequestConfig, AxiosResponse} from "axios";


const createRandomFriend = (): UserModel => {

    const rndNumber = Math.random() * 1000

    return {
        firstName: "Fatih",
        lastName: "Berlin",
        email: "likya@gmail.com",
        username: rndNumber.toString(),
        password:"password"
    }
}

export const getDummyFriendsData = (): Promise<AxiosResponse<Array<UserModel>>> => {

    const dummy_friends: Array<UserModel> = []

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
