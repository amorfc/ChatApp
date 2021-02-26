import "react-native-gesture-handler";
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet,View} from 'react-native';

//Import store
import {navigate} from "../navigation/navigation";
import {initI18n} from "../config/i18n-polyglot";
import {AuthStateType} from "../redux/features/auth/auth-types";
import {useSelector} from "react-redux";
import {RootStateType} from "../redux/root-reducers";

export default function ChatSplashScreen(): JSX.Element {

    const authState:AuthStateType = useSelector((state:RootStateType)=>state.auth)


    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"black",
        alignItems: 'center',
        justifyContent: 'center',
    },
});
