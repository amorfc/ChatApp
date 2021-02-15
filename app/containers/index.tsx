import "react-native-gesture-handler";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack"
//import instead of below to react-navigation/bottom-tab at future
import { createBottomTabNavigator } from "react-navigation-bottom-tabs-no-warnings";


//Import Screens
import LoginScreen from "./login/login"
import SignUpScreen from "./signUp/signUp";
import WelcomeScreen from "./welcome/welcome";
import SettingsScreen from "./settings/settings";
import ChatsScreen from "./chats/chats";

const MainStack = createStackNavigator()
const ChatsStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const HomeTab = createBottomTabNavigator()

function ChatsTab() {
    return (
        <ChatsStack.Navigator>
            <ChatsStack.Screen name="ChatsScreen" component={ChatsScreen}/>
        </ChatsStack.Navigator>
    )
}

function SettingsTab(){
    return(
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen}/>
        </SettingsStack.Navigator>
    )
}

function HomeScreen() {
    return (
        <HomeTab.Navigator>
            <HomeTab.Screen name="ChatsTab" component={ChatsTab}/>
            <HomeTab.Screen name="SettingsScreen" component={SettingsTab} />
        </HomeTab.Navigator>
    )
}

export default function RootNavigationContainer(props: any): JSX.Element {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>

            <MainStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
            <MainStack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>
            <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown:false}}/>
        </MainStack.Navigator>
    )
}
