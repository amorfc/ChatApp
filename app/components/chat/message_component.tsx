import * as React from "react"
import {StyleSheet, Text, View} from "react-native"
import {MessageModel} from "../../models/message-model";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";
import { Dimensions } from 'react-native';
import {LocalDateComponent} from "./local_date_component";
import {UserStateType} from "../../redux/features/user/user-types";
import {AuthStateType} from "../../redux/features/auth/auth-types";


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        minHeight: 10,
    },
    contentContainer: {
        flex:1,
        padding:10,
        flexDirection: "row",
        backgroundColor: "rgba(97, 97, 97, 0.80)",
        maxWidth:Dimensions.get("window").width*75/100,
        marginVertical: 5,
        borderRadius: 12
    },
    messageTextContainer: {
        flex:7,
        paddingHorizontal:2,
    },
    senderContainer: {
        paddingStart: 10,
        paddingTop: 5
    },
    messageTextStyle: {
        fontSize: 16
    },
    senderTextStyle: {
        fontSize: 20,
        color: "brown",
        fontWeight: "bold"
    },
    dateContainer:{
        flex:1,
    }
})


const MessageComponent = (props:any) => {
    console.log("MessageType Component Rendering")
    const {message} = props

    const userState:UserStateType = useSelector((state: RootStateType) => state.user)
    const authState:AuthStateType = useSelector((state: RootStateType) => state.auth)

    const messageSideManager = ():object =>{
        const side = authState.user?.username == message.senderUsername ? "flex-end":"flex-start"
        return {
            alignItems:side
        }
    }

    return (
        <View style={[styles.mainContainer,messageSideManager()]}>
            <View style={styles.contentContainer} >
                <View style={styles.messageTextContainer}>
                    <Text style={styles.messageTextStyle}>
                        {message.content}
                    </Text>
                </View>
                <View style={styles.dateContainer} >
                    <LocalDateComponent date={message.timeToSend} />
                </View>
            </View>
            {/*<View style={styles.senderContainer}>*/}
            {/*    <Text style={styles.senderTextStyle} >{message.senderUsername}</Text>*/}
            {/*</View>*/}
        </View>
    )
}

interface IMessageComponentProps {
    message:MessageModel
}

export default React.memo(MessageComponent)


