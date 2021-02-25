import * as React from "react"
import {StyleSheet, View} from "react-native"
import {MessageModel} from "../../models/message-model";


const styles = StyleSheet.create({
    mainContainer:{

    }
})



const MessageComponent = ({message:message}:{message:MessageModel}) =>{
    console.log(message)
    return (
        <View style={styles.mainContainer}>

        </View>
    )
}


