import * as React from "react"
import {Pressable, StyleSheet, Text} from "react-native";
import PropTypes from "prop-types"
import {Ionicons} from "@expo/vector-icons";


const IconButton = (props: any) => {

    const {iconName, onPress, disabled, iconStyle, iconColor} = props

    return (
        <Pressable
            style={[styles.icon_btn, iconStyle]}
            onPress={onPress}
            disabled={disabled}
        >
            <Ionicons
                name={iconName}
                size={22}
                color={iconColor}
            />
        </Pressable>

    )
}

const styles = StyleSheet.create({
    icon_btn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#94b6b9",
    }
})

IconButton.propTypes = {
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    iconStyle: PropTypes.object,
    iconColor: PropTypes.string
}

export default IconButton

