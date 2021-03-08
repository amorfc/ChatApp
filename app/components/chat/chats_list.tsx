import React from 'react'
import { FlatList } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ChatStateType } from '../../redux/features/chat/chat-types'
import { refreshChatsAT } from '../../redux/features/user/user-reducer'
import { UserStateType } from '../../redux/features/user/user-types'
import { RootStateType } from '../../redux/root-reducers'
import SingleChat from './single_chat'

const ChatList = (props:any) => {

    const dispatch = useDispatch()
    const userState:UserStateType = useSelector((state:RootStateType)=>state.user)

    const onRefreshChats = ()=>{
        dispatch(refreshChatsAT(null))
    }

    console.log("Chat List Rendering")

    return (
        <View style={styles.main_container} >
            <FlatList
                data={props.chatsData}
                renderItem={({ item }) => <SingleChat chat={item} />}
                keyExtractor={(item) => item.chat_id.toString()}
                refreshing={userState.isChatsStatusLoading}
                onRefresh={onRefreshChats}
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
