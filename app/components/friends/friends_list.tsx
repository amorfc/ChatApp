import * as React from "react"
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

//Components
import SingleFriend from "./friend"
import { UserModel } from "../../models/auth-model";
import { useEffect } from "react";
import { addFriendAT, refreshFriendsAT } from "../../redux/features/user/user-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../redux/root-reducers";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

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
    const [isAddFriendActive, setisAddFriendActive] = useState(false)
    const [friend, setFriend] = useState("")
    const [counter, setcounter] = useState(0)
    const dispatch = useDispatch()

    const onChangeText = (text: string) => {
        setFriend(text)
    }

    const addFriendPressed = () =>{
        if(friend.length > 3){
            dispatch(addFriendAT({
                friend_id: 0,
                has_active_chat: 0,
                firstName: "Soap",
                lastName: "Vayztangir",
                email: "fatihermetin@gmail.com",
                username: friend
            }))
        }
        setFriend("")
    }
    return (
        <View>
            <Button title={"+ Add Friend"} onPress={() => {
                setisAddFriendActive(!isAddFriendActive)
            }} />
            {isAddFriendActive ? (
                <>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeText(text)}
                        value={friend}
                    />
                    <Button
                        onPress={addFriendPressed}
                        title="Add Friend"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </>
            ) : null}
        </View>
    )
}


const FriendsList = (props: any): JSX.Element => {


    const userState = useSelector((state: RootStateType) => state.user)
    const dispatch = useDispatch()


    const onRefreshFriends = () => {
        dispatch(refreshFriendsAT(null))
    }
    console.log("friendsList Rendering")

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
