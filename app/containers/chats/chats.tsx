import * as React from "react";
import {View, StyleSheet, Text, Image, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";
import {useEffect} from "react";
import { refreshChats } from "../../redux/features/user/user-reducer";
import ChatList from "../../components/chat/chats_list";

export default function ChatsScreen(props:any) {
    //HUB CONNECTION
    const dispatch = useDispatch()
    const userState = useSelector((state: RootStateType) => state.user)

    useEffect(() =>{
        console.log("Chats Resfreshing")
        dispatch(refreshChats(null))
    },[])

    console.log("Chat Screen Rendering")

    return (
        <View style={styles.mainContainer} >
            <ChatList chatsData={userState.chats}  />
        </View>
    );
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
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        paddingTop: 40,
        marginBottom:20,
        paddingHorizontal: 32,
    },
});
