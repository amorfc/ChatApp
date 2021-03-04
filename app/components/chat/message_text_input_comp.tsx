import * as React from "react";
import {View, StyleSheet, Text, Image, Button, TextInput} from "react-native";
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
import {MessageType} from "../../types/MessageType";
import MessageList from "../../components/chat/message_list";
import IconButton from "../buttons/icon_button";


const MessageTextInput = (props: any) => {


    const dispatch = useDispatch()
    const chatState = useSelector((state: RootStateType) => state.chat)

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
            <View style={styles.textInputContainer}>
            <TextInput
                autoCapitalize={"none"}
                style={styles.textInput}
                placeholder={"Say Something..."}
                allowFontScaling={true}
                placeholderTextColor={"gray"}
                onChangeText={(text: string) => dispatch(changeMessage(text))}
                value={chatState.message}
            />
            </View>
            <View style={styles.iconButtonContainer}>
                <IconButton
                    iconName={"send-outline"}
                    iconSize={24}
                    iconStyle={styles.iconStyle}
                    iconColor={"black"}
                    onPress={() => sendMessage(chatState.message)}
                    disabled={!chatState.isConnected}
                />
            </View>
        </View>
    );
}

interface FlatListRefType {


}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textInputContainer: {
        flex: 6,
        borderRadius:50,
        justifyContent: "center",
        backgroundColor: "#d6e0df"
    },
    iconButtonContainer: {
        flex:1,
        marginLeft:2
    },
    iconStyle:{
        borderRadius:50,
    },
    textInput: {
        borderRadius:50,
        paddingHorizontal:10
    },
});


export default MessageTextInput;
