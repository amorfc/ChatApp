import * as React from "react"
import {Button, FlatList, StyleSheet, Text, View} from "react-native";

//Components
import SingleFriend from "./friend"
import {UserModel} from "../../models/auth-model";
import {useEffect} from "react";
import {fetchAllFriends} from "../../redux/features/user/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";

const styles = StyleSheet.create({
    main_container:{
        flex:1,
    },
    friends_list_header_container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10
    }

})


const FriendsListHeaderComponent = ():JSX.Element =>{
    return (
        <View>
            <Button title={"+ Add Friend"} onPress={()=>{
                console.log("Add Friend button Pressed")}}/>
        </View>
    )
}


const FriendsList = (props:any): JSX.Element => {


    const userState = useSelector((state:RootStateType) => state.user)
    const dispatch = useDispatch()

    const renderSingleFriend = (item: UserModel) => {
        return(
            <SingleFriend friend={item} />
        )
    }

    const refreshFriends = ()=>{
            dispatch(fetchAllFriends(null))
    }

    return(
        <View style={styles.main_container} >
            <FlatList
                data={props.friendsData}
                renderItem={({item})=>renderSingleFriend(item)}
                keyExtractor={(item) => item.username}
                ListHeaderComponent={FriendsListHeaderComponent}
                ListHeaderComponentStyle={styles.friends_list_header_container}
                refreshing={userState.isFriendsStatusLoading}
                onRefresh={refreshFriends}
            />
        </View>
    )
}



export default FriendsList
