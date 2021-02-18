import "react-native-gesture-handler";
import React, {useEffect, useState} from 'react';
import {Provider} from "react-redux";
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context"
import AppNavigationContainer from "./containers"

//Import store
import store from "./redux/configure-store";
import {navigationRef} from "./navigation/navigation";
import FlashMessage from "react-native-flash-message";
import {initI18n} from "./config/i18n-polyglot";
import {initAuth} from "./redux/features/auth/auth-reducer";

export default function App(): JSX.Element {

    const [isAppInitiated, setIsAppInitiated] = useState(false)

    //One time check if auth data available
    useEffect(() => {
        initI18n("tr")
        store.dispatch(initAuth(null))
        setIsAppInitiated(true)
    }, [])


    if (!isAppInitiated) {
        return <></>
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer ref={navigationRef}>
                    <AppNavigationContainer/>
                </NavigationContainer>
            </SafeAreaProvider>
            <FlashMessage position={"top"}/>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
