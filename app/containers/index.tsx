import "react-native-gesture-handler";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack"
//import instead of below to react-navigation/bottom-tab at future
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";


//Import Screens
import LoginScreen from "./login/login"
import SignUpScreen from "./signUp/signUp";
import WelcomeScreen from "./welcome/welcome";
import SettingsScreen from "./settings/settings";
import ChatsScreen from "./chats/chats";

//Types
import {AuthStateType} from "../redux/features/auth/auth-types";
import {RootStateType} from "../redux/root-reducers";
import {ChatStateType} from "../redux/features/chat/chat-types";
import {initAuth} from "../redux/features/auth/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import store from "../redux/configure-store";
import {initI18n} from "../config/i18n-polyglot";
import FriendsScreen from "./friends/friends";
import {refreshFriends, setUserConnection} from "../redux/features/user/user-reducer";
import {doConnection} from "../redux/features/chat/chat-reducer";
import {GlobalConstants} from "../config/global-constans";
import ChatSplashScreen from "./ChatSplashScreen";

const MainStack = createStackNavigator()
const ChatsStack = createStackNavigator()
const FriendsStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const HomeTab = createMaterialTopTabNavigator()

function ChatsTab() {
    return (
        <ChatsStack.Navigator>
            <ChatsStack.Screen name="ChatsScreen" component={ChatsScreen}options={{headerShown: false}}/>
        </ChatsStack.Navigator>
    )
}

function FriendsTab() {
    return (
        <FriendsStack.Navigator>
            <FriendsStack.Screen name="FriendsScreen" component={FriendsScreen}options={{headerShown: false}}/>
        </FriendsStack.Navigator>
    )
}

function SettingsTab() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>
        </SettingsStack.Navigator>
    )
}

function HomeScreen():JSX.Element {
    return (
        <HomeTab.Navigator tabBarOptions={{style:{marginTop:60}}} >
            <HomeTab.Screen name="Friends" component={FriendsTab}/>
            <HomeTab.Screen name="Chats" component={ChatsTab}/>
            <HomeTab.Screen name="Settings" component={SettingsTab} />
        </HomeTab.Navigator>
    )
}

export default function RootNavigationContainer(props: any): JSX.Element {

    const dispatch = useDispatch()
    const authState: AuthStateType = useSelector((state: RootStateType) => state.auth)
    const chatState: ChatStateType = useSelector((state: RootStateType) => state.chat)

    useEffect(() => {
        if(authState.user) {
            dispatch(setUserConnection(true))
            dispatch(refreshFriends(null))
            !chatState.isConnected ? dispatch(doConnection(null)): null
        }
    }, [authState.user])

    return (
        <MainStack.Navigator>
            {authState.user ? (
                    <MainStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
                ) :
                (<>
                        <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen}
                                          options={{headerShown: false}}/>
                        <MainStack.Screen name="LoginScreen" component={LoginScreen}
                                          options={{headerShown: false}}/>
                        <MainStack.Screen name="SignUpScreen" component={SignUpScreen}
                                          options={{headerShown: false}}/>
                    </>
                )}


        </MainStack.Navigator>
    )
}
