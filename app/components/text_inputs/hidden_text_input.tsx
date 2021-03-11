import * as React from "react";
import {TextInput, StyleSheet, View, Text} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons"
import {useState} from "react";
import PropTypes from "prop-types"
import StyleGuide from "../../style/StyleGuide";

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center"
    },
    textInputContainer: {
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
    secureMaterialIconContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    errorContainer:{
        marginVertical:5
    },
    errorTextStyle:{
        color:StyleGuide.FormErrorTextColor
    }
})

const HiddenIconTextInput = (props: any): JSX.Element => {

    const {iconName, iconSize, iconColor, value, error, touched, onChangeText, onBlur, placeholderTextColor} = props

    const [initialFocus, setInitialFocus] = useState(false);
    const [eyeIcon, setEyeIcon] = useState("visibility-off");
    const [isPassword, setIsPassword] = useState(true);

    const changePwdType = () => {
        setEyeIcon(isPassword ? "visibility" : "visibility-off");
        setIsPassword(prevState => !prevState);
    };
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
            <View style={styles.textInputContainer} >
                <Ionicons
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                    style={{paddingLeft: 5}}
                />
                <TextInput
                    onBlur={onBlur}
                    onChangeText={onChangeText}
                    style={[styles.textInput,setInputErrorBorder()]}
                    secureTextEntry={isPassword}
                    autoCorrect={false}
                    value={initialFocus ? value : "Password"}
                    onFocus={() => setInitialFocus(true)}
                    placeholderTextColor={placeholderTextColor}
                    clearButtonMode={"while-editing"}
                    selectionColor={"white"}
                />
                <View style={styles.secureMaterialIconContainer}>
                    <MaterialIcons
                        // style={styles.icon}
                        name={eyeIcon}
                        size={iconSize}
                        color={StyleGuide.PrimaryIconColor}
                        onPress={changePwdType}
                    />
                </View>
            </View>
            <View style={styles.errorContainer} >
                <Text style={styles.errorTextStyle} >{touched && error}</Text>
            </View>
        </View>
    );
};

HiddenIconTextInput.defaultProps = {
    iconSize: 25,
    placeholder: "Password",
    iconColor: "#222222",
    iconName: "lock-closed",
};

HiddenIconTextInput.propTypes = {
    iconSize: PropTypes.number,
    value: PropTypes.string,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholderTextColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    onBlur:PropTypes.func,
    error:PropTypes.string,
    touched:PropTypes.bool
};

export default HiddenIconTextInput;

