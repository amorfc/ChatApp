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
import { fetchAllChats, getAllChats, refreshChats } from "../../redux/features/user/user-reducer";
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

export default function ChatsScreen(props:any) {
    //HUB CONNECTION
    const dispatch = useDispatch()
    const userState = useSelector((state: RootStateType) => state.user)
    const chatState = useSelector((state: RootStateType) => state.chat)

    useEffect(() =>{
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(refreshChats(null))
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
          return unsubscribe;
    },[props.navigation])
    
    return (
        <View style={styles.mainContainer} >
            <ChatList chatsData={userState.chats}  />
        </View>
    );
}

