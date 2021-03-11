import * as React from "react";
import {TextInput, StyleSheet, View, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons"
import PropTypes from "prop-types"
import StyleGuide from "../../style/StyleGuide";


const styles = StyleSheet.create({
    container: {
       flexDirection:"column",
        alignItems:"center"
    },
    inputContainer:{
        flexDirection: "row",
        borderRadius: 18,
        borderColor: "gray",
        alignItems: "center",
    },
    textInput: {
        padding: 5,
        flex: 1,
        paddingVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        color: "white",
        backgroundColor: StyleGuide.SecondaryBGColor,
    },
    errorContainer:{
        marginVertical:5
    },
    errorTextStyle:{
        color:StyleGuide.FormErrorTextColor
    }
})

const IconTextInput = (props: any): JSX.Element => {

    const {iconName, iconSize, iconColor, secureTextEntry, placeholder, onChangeText, value, error} = props
    return (
        <View style={styles.container}>
            <View  style={styles.inputContainer}>
                <Ionicons
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                    style={{paddingLeft: 5}}
                />
                <TextInput
                    {...props}
                    autoCapitalize={"none"}
                    value={value}
                    style={styles.textInput}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    clearButtonMode={"while-editing"}
                    placeholderTextColor={"white"}
                    selectionColor={"white"}
                    onChangeText={onChangeText}
                />
            </View>
            <View style={styles.errorContainer} >
                <Text style={styles.errorTextStyle} >{error}</Text>
            </View>
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

