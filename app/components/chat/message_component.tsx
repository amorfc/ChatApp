import * as React from "react"
import {StyleSheet, Text, View} from "react-native"
import {MessageModel} from "../../models/message-model";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"rgba(97, 97, 97, 0.49)",
        minHeight:50,
        marginVertical:5,
        borderRadius:20
    },
    messageTextContainer:{
        padding:10,
        fontSize:100
    }
})



export const MessageComponent = ({message:message}:{message:MessageModel}) =>{
    const userState = useSelector((state:RootStateType) => state.user)
    return (
        <View style={styles.mainContainer}>
            <View style={styles.messageTextContainer} >
                <Text>
                    {message.content}
                </Text>
            </View>
        </View>
    )
}


