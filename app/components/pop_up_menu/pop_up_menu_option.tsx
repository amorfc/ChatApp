import React from 'react'
import { View, Text } from 'react-native'
import { MenuOption } from 'react-native-popup-menu'

const PopUpMenuOption= (props:any) => {

    const {onPress, menuName} = props

    return (
        <MenuOption
            text={menuName}
            onSelect={onPress}
             />
    )
}

export default PopUpMenuOption
