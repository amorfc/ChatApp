import * as React from "react";
import {View, StyleSheet, Text, Image, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";
import {
    changeMessage,
    chatProcess,
    doSendMessage,
    fetchActiveChat,
    getChatMessagesFromDb,
    setReceiveMessage,
} from "../../redux/features/chat/chat-reducer";
import IconTextInput from "../../components/text_inputs/icon_text_input";
import PrimaryBtn from "../../components/buttons/primary_btn";
import {FlatList} from "react-native-gesture-handler";
import {MessageModel} from "../../models/message-model";
import {SenderMessageType} from "../../redux/features/chat/chat-types";
import {createRef, MutableRefObject, useEffect, useRef, useState} from "react";
import {navigate} from "../../navigation/navigation";
import {Message} from "../../types/Message";
import MessageList from "../../components/chat/message_list";


const ActiveChatScreen = (props: any) => {
    //HUB CONNECTION
    const dispatch = useDispatch()



    const chatState = useSelector((state: RootStateType) => state.chat)
    const authState = useSelector((state: RootStateType) => state.auth)
    const {activeChatFriend} = chatState

    useEffect(() => {

        dispatch(getChatMessagesFromDb(null))
        const unsubscribe = props.navigation.addListener('focus', () => {
            navigate("ActiveChatScreen", null)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
        //Get Users Chat Messages
    }, [])


    const sendMessage = (message: string) => {
        if (message.length > 0) {

            const Message: SenderMessageType = {
                content: message,
                messageType: chatState.chatType,
                receiverName: chatState.activeChatFriend.username
            }
            dispatch(doSendMessage(Message))
        }
    }

    return (
        <View style={styles.mainContainer}>
                <Text>Chat with {chatState.activeChatFriend.username}</Text>
            <View style={styles.middleContainer}>
                <MessageList allMessages={chatState.allMessagesForSelectedChat} />
            </View>
            <View style={styles.bottomContainer}>
                <IconTextInput
                    // iconName={"send-outline"}
                    iconSize={24}
                    iconColor={"darkgray"}
                    placeholder={"Text"}
                    placeholderTextColor={"darkgray"}
                    value={chatState.message}
                    onChangeText={(text: string) => dispatch(changeMessage(text))}/>
                <PrimaryBtn text={"Send"} disabled={!chatState.isConnected}
                            onPress={() => sendMessage(chatState.message)}/>
            </View>
        </View>
    );
}

interface FlatListRefType {


}



const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 0,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    topContainer: {
        height: 320,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    middleContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 2,
    },
    bottomContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
        marginBottom: 20,
        paddingHorizontal: 32,
    },
});


export default ActiveChatScreen;
