import * as React from "react";
import {TextInput, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons"
import PropTypes from "prop-types"


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 18,
        borderColor: "gray",
        alignItems: "center"
    },
    textInput: {
        padding: 5,
        flex: 1,
        paddingVertical: 8,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#FFFFFF",
    },
    text: {
        color: "black"
    }
})

const IconTextInput = (props: any): JSX.Element => {

    const {iconName, iconSize, iconColor, secureTextEntry, placeholder, onChangeText,value} = props

    return (
        <View style={styles.container}>
            <Ionicons
                name={iconName}
                size={iconSize}
                color={iconColor}
                style={{paddingLeft: 5}}
            />
            <TextInput
                autoCapitalize={"none"}
                style={styles.textInput}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                clearButtonMode={"while-editing"}
                placeholderTextColor={"gray"}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

IconTextInput.propTypes = {
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func
}

export default IconTextInput

