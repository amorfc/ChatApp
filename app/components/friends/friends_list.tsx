import * as React from "react"
import {FlatList, StyleSheet, Text, View} from "react-native";

//Components
import SingleFriend from "./friend"
import {UserModel} from "../../models/auth-model";

const styles = StyleSheet.create({
    main_container:{
        flex:1,
    }
})



const FriendsList = (props:any): JSX.Element => {

    const renderSingleFriend = (item: UserModel) => {
        return(
            <SingleFriend friend={item} />
        )
    }

    return(
        <View style={styles.main_container} >
            <FlatList
                data={props.friendsData}
                renderItem={({item})=>renderSingleFriend(item)}
                keyExtractor={(item) => item.username}
            />
        </View>
    )
}



export default FriendsList
