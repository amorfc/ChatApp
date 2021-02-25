import "react-native-gesture-handler";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack"
//import instead of below to react-navigation/bottom-tab at future
import {createBottomTabNavigator} from "react-navigation-bottom-tabs-no-warnings";


//Import Screens
import LoginScreen from "./login/login"
import SignUpScreen from "./signUp/signUp";
import WelcomeScreen from "./welcome/welcome";
import SettingsScreen from "./settings/settings";
import ChatsScreen from "./chats/chats";
import {AuthStateType} from "../redux/features/auth/auth-types";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/root-reducers";
import {initAuth} from "../redux/features/auth/auth-reducer";
import {useEffect, useState} from "react";
import store from "../redux/configure-store";
import {initI18n} from "../config/i18n-polyglot";
import FriendsScreen from "./friends/friends";
import {fetchAllFriends, setUserConnection} from "../redux/features/user/user-reducer";
import {doConnection} from "../redux/features/chat/chat-reducer";
import {GlobalConstants} from "../config/global-constans";
import {ChatStateType} from "../redux/features/chat/chat-types";

const MainStack = createStackNavigator()
const ChatsStack = createStackNavigator()
const FriendsStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const HomeTab = createBottomTabNavigator()

function ChatsTab() {
    return (
        <ChatsStack.Navigator>
            <ChatsStack.Screen name="ChatsScreen" component={ChatsScreen}/>
        </ChatsStack.Navigator>
    )
}

function FriendsTab() {
    return (
        <FriendsStack.Navigator>
            <FriendsStack.Screen name="FriendsScreen" component={FriendsScreen}/>
        </FriendsStack.Navigator>
    )
}

function SettingsTab() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen}/>
        </SettingsStack.Navigator>
    )
}

function HomeScreen():JSX.Element {
    return (
        <HomeTab.Navigator>
            <HomeTab.Screen name="FriendsTab" component={FriendsTab}/>
            <HomeTab.Screen name="ChatsTab" component={ChatsTab}/>
            <HomeTab.Screen name="SettingsScreen" component={SettingsTab}/>
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
            dispatch(fetchAllFriends(null))
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
