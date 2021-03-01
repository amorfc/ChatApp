import React from 'react'
import {View, Text, StyleSheet, Image, Pressable} from 'react-native'
import {useDispatch} from "react-redux";
import {chatProcess} from "../../redux/features/chat/chat-reducer";
import {navigate} from "../../navigation/navigation";

const SingleChat = (props: any) => {
    const dispatch = useDispatch()
    const {chat} = props

    const onSingleChatPressedIn = () => {
        dispatch(chatProcess(chat.friend_id))
    }
    const navigateActiveChatScreen = () => {

        navigate("ActiveChatScreen", null)
    }

    return (
        <Pressable onPress={() => navigateActiveChatScreen()} onPressIn={()=>onSingleChatPressedIn()}>
            <View style={styles.main_container}>
                <View style={styles.image_container}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}/>
                </View>
                <View style={styles.info_container}>
                    <Text>{chat.chat_id}</Text>
                    <Text>{chat.friend_id}</Text>
                </View>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    main_container: {
        flexDirection: "row",
        padding: 10
    },
    image_container: {
        justifyContent: "center",
        alignItems: "center"
    },
    info_container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    tinyLogo: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
})

export default SingleChat
