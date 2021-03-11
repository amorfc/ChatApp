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
        borderWidth:StyleGuide.InputFormBorderWidth,
        borderColor:StyleGuide.DefaultInputErrorBorderColor,
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

    const {iconName, iconSize, iconColor, secureTextEntry, placeholder, onChangeText, onBlur, value, error, touched} = props

    const setInputErrorBorder = ():object=>{
        if(touched && error){
            return {
                borderWidth:StyleGuide.InputFormBorderWidth,
                borderColor: StyleGuide.InputErrorBorderColor
            }
        }
        return {}
    }

    return (
        <View style={styles.container}>
            <View  style={[styles.inputContainer]}>
                <Ionicons
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                    style={{paddingLeft: 5}}
                />
                <TextInput
                    autoCapitalize={"none"}
                    value={value}
                    style={[styles.textInput,setInputErrorBorder()]}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    clearButtonMode={"while-editing"}
                    placeholderTextColor={"white"}
                    selectionColor={"white"}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
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
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    error:PropTypes.string,
    touched:PropTypes.bool,
}

export default IconTextInput

