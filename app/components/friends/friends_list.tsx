import * as React from "react"
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

//Components
import SingleFriend from "./friend"
import { UserModel } from "../../models/auth-model";
import { useEffect } from "react";
import { addFriend, refreshFriends } from "../../redux/features/user/user-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../redux/root-reducers";
import { useState } from "react";

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    friends_list_header_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    }

})

const FriendsListHeaderComponent = (): JSX.Element => {
    const [counter, setcounter] = useState(0)
    const dispatch = useDispatch()

    return (
        <View>
            <Button title={"+ Add Friend"} onPress={() => {
                console.log("Add Friend button Pressed")
                setcounter(counter+1)
                dispatch(addFriend({
                    friend_id:null,
                    has_active_chat:null,
                    firstName: "Soap",
                    lastName: "Vayztangir",
                    email: "fatihermetin@gmail.com",
                    username: `YeniKullanici${counter}`
                }))
            }} />
        </View>
    )
}


const FriendsList = (props: any): JSX.Element => {


    const userState = useSelector((state: RootStateType) => state.user)
    const dispatch = useDispatch()


    const onRefreshFriends = () => {
        dispatch(refreshFriends(null))
    }

    return (
        <View style={styles.main_container} >
            <FlatList
                data={props.friendsData}
                renderItem={({ item }) => <SingleFriend friend={item} />}
                keyExtractor={(item) => item.username}
                ListHeaderComponent={FriendsListHeaderComponent}
                ListHeaderComponentStyle={styles.friends_list_header_container}
                refreshing={userState.isFriendsStatusLoading}
                onRefresh={onRefreshFriends}
            />
        </View>
    )
}



export default FriendsList
