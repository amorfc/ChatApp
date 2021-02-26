import * as React from "react"
import {StyleSheet, Text, View} from "react-native"
import {Dimensions} from 'react-native';
import {useEffect, useState} from "react";


const styles = StyleSheet.create({})


export const LocalDateComponent = (props: any) => {

    const [time] = useState(new Date(props.date))

    return (
        <Text>{`${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`}</Text>
    )
}

const formatTime = (number:number):string=>{
    if(number<10) return `0${number}`
    return `${number}`
}


