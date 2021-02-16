import * as React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import {Ionicons} from "@expo/vector-icons"

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        borderWidth:1,
        borderRadius:18,
        borderColor:"gray",
        alignItems:"center"
    },
    textInput:{
        padding: 5,
        flex: 1,
        paddingVertical: 8,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#FFFFFF",
    },
    text:{
        color:"black"
    }
})

export default function component(props:any){
    return(
        <View style={styles.container} >
            <Ionicons
                name={props.iconName}
                size={props.iconSize}
                color={props.iconColor}
                style={{paddingLeft:5}}
            />
            <TextInput
                autoCapitalize={"none"}
                style={styles.textInput}
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
                placeholderTextColor={"gray"}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
