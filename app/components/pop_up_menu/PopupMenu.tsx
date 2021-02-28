import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
    renderers,
} from "react-native-popup-menu"
import { useDispatch } from 'react-redux'
import { navigate } from '../../navigation/navigation'
import { setActiveChatFriend } from '../../redux/features/chat/chat-reducer'
import { Friend } from '../../types/Friend'
import PopUpMenuOption from './pop_up_menu_option'

const PopupMenu = (props:any) => {
    
    const dispatch = useDispatch()

    const { children, friend } = props
    
    const detailsMenuClicked = (friend:Friend) => {
        console.log("Details Clicked")
    }
    const messageMenuClicked = (friend:Friend) => {
        //Navigate Chat Screen With Clicked Friend Parameter
        dispatch(setActiveChatFriend(friend))
        navigate("ActiveChatScreen",null)
    }
    return (
        <View>
            <Menu  >
                <MenuTrigger children={children} />
                    <MenuOptions>
                        <PopUpMenuOption menuName="Details" onPress={()=>detailsMenuClicked(friend)} />
                        <PopUpMenuOption menuName="Message" onPress={()=>messageMenuClicked(friend)} />
                    </MenuOptions>
            </Menu>
        </View>
    )
}

export default PopupMenu

const styles = StyleSheet.create({})
