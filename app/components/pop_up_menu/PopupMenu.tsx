import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
    renderers,
} from "react-native-popup-menu"
import { navigate } from '../../navigation/navigation'
import { Friend } from '../../types/Friend'
import PopUpMenuOption from './pop_up_menu_option'

const PopupMenu = (props:any) => {
    const { children, friend } = props

    return (
        <View>
            <Menu  >
                <MenuTrigger children={children} />
                    <MenuOptions>
                        <PopUpMenuOption menuName="Details" onPress={detailsMenuClicked(friend)} />
                        <PopUpMenuOption menuName="Message" onPress={messageMenuClicked(friend)} />
                    </MenuOptions>
            </Menu>
        </View>
    )
}

const detailsMenuClicked = (friend:Friend) => {
    console.log("Details Clicked")
}
const messageMenuClicked = (friend:Friend) => {
    //Navigate Chat Screen With Clicked Friend Parameter
    navigate("ActiveChatScreen",{
        friend
    })
}

export default PopupMenu

const styles = StyleSheet.create({})
