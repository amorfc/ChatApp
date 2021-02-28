import * as React from "react";
import {View, StyleSheet, Text, Image, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";
import {
    changeMessage,
    doSendMessage,
} from "../../redux/features/chat/chat-reducer";
import IconTextInput from "../../components/text_inputs/icon_text_input";
import PrimaryBtn from "../../components/buttons/primary_btn";
import {FlatList} from "react-native-gesture-handler";
import {MessageModel} from "../../models/message-model";
import {SenderMessageType} from "../../redux/features/chat/chat-types";
import {MessageComponent} from "../../components/chat/message_component";
import { useEffect, useState } from "react";



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

const ActiveChatScreen = (props:any)=>{
    //HUB CONNECTION
    const dispatch = useDispatch()
    const [friend,setFriend] = useState(props.route.params.friend)
    const authState = useSelector((state: RootStateType) => state.auth)
    const chatState = useSelector((state: RootStateType) => state.chat)
  
    useEffect(() =>{
        //Get Users Chat Messages

    },[])

    const sendMessage = (message:string)=>{
        const Message:SenderMessageType = {
            content: message,
            messageType:chatState.chatType,
            receiverName:"1111"
        }
        dispatch(doSendMessage(Message))
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.middleContainer}>
            <Text>Chat with {friend.username}</Text>
                {/* <FlatList
                    data={chatState.allMessagesForSelectedChat}
                    keyExtractor={(item => item.timeToSend)}
                    renderItem={({item:message}:{item:MessageModel})=><MessageComponent message={message}/>}/> */}
            </View>
            <View style={styles.bottomContainer} >
                <IconTextInput
                    // iconName={"send-outline"}
                    iconSize={24}
                    iconColor={"darkgray"}
                    placeholder={"Text"}
                    placeholderTextColor={"darkgray"}
                    value={chatState.message}
                    onChangeText={(text: string) => dispatch(changeMessage(text)) }/>
                    <PrimaryBtn  text={"Send"} disabled={!chatState.isConnected} onPress={()=>sendMessage(chatState.message)} />
            </View>
        </View>
    );
}

export default ActiveChatScreen;
