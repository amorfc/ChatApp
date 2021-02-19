import {UserModel} from "../models/auth-model"


const createRandomFriend = (): UserModel => {

    const rndNumber = Math.random() * 1000

    return {
        firstName: "",
        lastName: "",
        email: "",
        username: rndNumber.toString()
    }
}

export const getDummyFriendsData = ():Array<UserModel> => {

    const dummy_friends:Array<UserModel> = []

    for(let i = 0; i<40; i++) dummy_friends.push(createRandomFriend())

    return dummy_friends
}
