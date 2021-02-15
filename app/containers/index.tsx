import "react-native-gesture-handler";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack"


//Import Screens
import LoginScreen from "./login/login"
import SignUpScreen from "./signUp/signUp";
import WelcomeScreen from "./welcome/welcome";
import SettingsScreen from "./settings/settings";
import ChatsScreen from "./chats/chats";

const MainStack = createStackNavigator()
const ChatsStack = createStackNavigator()
const HomeStack = createStackNavigator()

function ChatsTab() {
    return (
        <ChatsStack.Navigator>
            <ChatsStack.Screen name="ChatsScreen" component={ChatsScreen}/>
        </ChatsStack.Navigator>
    )
}

function HomeScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="ChatsTab" component={ChatsTab}/>
            <HomeStack.Screen name="SettingsScreen" component={SettingsScreen} />
        </HomeStack.Navigator>
    )
}

export default function RootNavigationContainer(props: any) {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="HomeScreen" component={HomeScreen}/>

            <MainStack.Screen name="LoginScreen" component={LoginScreen}/>
            <MainStack.Screen name="SignUpScreen" component={SignUpScreen}/>
            <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        </MainStack.Navigator>
    )
}
