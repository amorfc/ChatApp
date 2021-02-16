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

    const {iconName, iconSize, iconColor, secureTextEntry, placeholder, onChangeText} = props

    return(
        <View style={styles.container} >
            <Ionicons
                name={iconName}
                size={iconSize}
                color={iconColor}
                style={{paddingLeft:5}}
            />
            <TextInput
                autoCapitalize={"none"}
                style={styles.textInput}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={"gray"}
                onChangeText={onChangeText}
            />
        </View>
    )
}
