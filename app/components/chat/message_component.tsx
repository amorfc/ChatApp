import * as React from "react"
import {StyleSheet, Text, View} from "react-native"
import {MessageModel} from "../../models/message-model";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";
import { Dimensions } from 'react-native';
import {LocalDateComponent} from "./local_date_component";


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "rgba(97, 97, 97, 0.49)",
        minHeight: 10,
        maxWidth:Dimensions.get("window").width*90/100,
        marginVertical: 5,
        borderRadius: 12
    },
    contentContainer: {
        flex:1,
        padding:10,
        flexDirection: "row",
    },
    messageTextContainer: {
        flex:8,
        paddingHorizontal:2,
        backgroundColor:"red"
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
        justifyContent:"flex-end",
        backgroundColor:"yellow",
        padding:2,
    }
})


export const MessageComponent = ({message: message}: { message: MessageModel }) => {
    const userState = useSelector((state: RootStateType) => state.user)
    return (
        <View style={styles.mainContainer}>
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


