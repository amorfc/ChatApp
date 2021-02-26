import * as React from "react"
import {StyleSheet, Text, View} from "react-native"
import {Dimensions} from 'react-native';
import {useEffect, useState} from "react";


const styles = StyleSheet.create({
    dateContainer:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
    },
    dateTextStyle:{
        fontSize:13,
    }
})


export const LocalDateComponent = (props: any) => {

    const [time] = useState(new Date(props.date))

    return (
        <View style={styles.dateContainer} >
            <Text style={styles.dateTextStyle} >{`${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`}</Text>
        </View>
    )
}

const formatTime = (number: number): string => {
    if (number < 10) return `0${number}`
    return `${number}`
}


