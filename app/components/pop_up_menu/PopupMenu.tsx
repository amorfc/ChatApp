import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
    renderers,
} from "react-native-popup-menu"
import {useDispatch} from 'react-redux'
import {navigate} from '../../navigation/navigation'
import {chatProcess, initChat, setActiveChatFriend} from '../../redux/features/chat/chat-reducer'
import {Friend} from '../../types/Friend'
import PopUpMenuOption from './pop_up_menu_option'

const PopupMenu = (props: any) => {

    const dispatch = useDispatch()

    const {children, friend} = props

    const detailsMenuClicked = (friend: Friend) => {
        console.log("Details Clicked")
    }
    const messageMenuClicked = (friend: Friend) => {
        //Navigate Chat Screen With Clicked Friend Parameter
        navigate("ActiveChatScreen", null)
    }

    function onFriendPressedIn() {
        console.log("OnPresseding Working")
        dispatch(chatProcess(friend.friend_id))
    }

    return (
            <View>
                <Menu>
                    <MenuTrigger triggerOnLongPress={true} onPress={()=>onFriendPressedIn()} children={children}/>
                    <MenuOptions>
                        <PopUpMenuOption menuName="Details" onPress={() => detailsMenuClicked(friend)}/>
                        <PopUpMenuOption menuName="Message" onPress={() => messageMenuClicked(friend)}/>
                    </MenuOptions>
                </Menu>
            </View>
    )
}

export default PopupMenu

const styles = StyleSheet.create({})
