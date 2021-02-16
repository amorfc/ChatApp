import * as React from "react"
import {Pressable, StyleSheet, Text} from "react-native";


export default function Component(props:any): JSX.Element{
    return(
        <Pressable
            style={[styles.primary_btn]}
            onPress={props.onPress}
        >
            <Text>
                {props.text}
            </Text>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    primary_btn:{
        height:35,
        padding:5,
        borderRadius:8,
        marginHorizontal: 8,
        backgroundColor:"#94b6b9",
        justifyContent:"center",
        alignItems:"center"
    }
})
