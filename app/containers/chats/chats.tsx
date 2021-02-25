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
        paddingHorizontal: 32,
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
    const authState = useSelector((state: RootStateType) => state.auth)
    const chatState = useSelector((state: RootStateType) => state.chat)

    useEffect(()=>{
        dispatch(doConnection(null))
    },[])


    const sendMessage = (message:string)=>{
        dispatch(doSendMessage(message))
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.middleContainer}>
            <Text>ChatsScreen {authState.user?.username}</Text>
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
                    <PrimaryBtn  text={"Send"} onPress={()=>sendMessage(chatState.message)} />
            </View>
        </View>
    );
}

