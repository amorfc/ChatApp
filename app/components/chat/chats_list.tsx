import React from 'react'
import { FlatList } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import SingleChat from './single_chat'

const ChatList = (props:any) => {
    return (
        <View style={styles.main_container} >
            <FlatList
                data={props.chatsData}
                renderItem={({ item }) => <SingleChat chat={item} />}
                keyExtractor={(item) => item.chat_id}
                // refreshing={userState.isFriendsStatusLoading}
                // onRefresh={onRefreshFriends}
            />
        </View>
    )
}
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
export default ChatList
