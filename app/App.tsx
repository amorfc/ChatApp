import "react-native-gesture-handler";
import React from 'react';
import {Provider} from "react-redux";
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context"
import AppNavigationContainer from "./containers"

//Import store
import store from "./redux/configure-store";
import {navigationRef} from "./navigation/navigation";

export default function App(): JSX.Element {
    return (
        <Provider store={store} >
            <SafeAreaProvider>
                <NavigationContainer ref={navigationRef} >
                    <AppNavigationContainer/>
                </NavigationContainer>
            </SafeAreaProvider>
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
