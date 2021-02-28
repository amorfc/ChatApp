import * as React from "react";
import {View, StyleSheet, Text, Image, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";
import {
    changeMessage,
    connection,
    doConnection,
    // doReceiveMessage,
    doSendMessage,
    setReceiveMessage
} from "../../redux/features/chat/chat-reducer";
import IconTextInput from "../../components/text_inputs/icon_text_input";
import {changeEmail} from "../../redux/features/auth/auth-reducer";
import {useEffect} from "react";
import PrimaryBtn from "../../components/buttons/primary_btn";
import {FlatList} from "react-native-gesture-handler";
import {MessageModel} from "../../models/message-model";
import {SenderMessageType} from "../../redux/features/chat/chat-types";
import {MessageComponent} from "../../components/chat/message_component";
import { fetchAllChats, getAllChats } from "../../redux/features/user/user-reducer";
import ChatList from "../../components/chat/chats_list";


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
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        paddingTop: 40,
        marginBottom:20,
        paddingHorizontal: 32,
    },
});

export default function ChatsScreen() {
    //HUB CONNECTION
    const dispatch = useDispatch()
    const userState = useSelector((state: RootStateType) => state.user)
    const chatState = useSelector((state: RootStateType) => state.chat)

    useEffect(() =>{
        dispatch(fetchAllChats(null))
    },[])

    return (
        <View style={styles.mainContainer} >
            <ChatList chatsData={userState.chats}  />
        </View>
    );
}

