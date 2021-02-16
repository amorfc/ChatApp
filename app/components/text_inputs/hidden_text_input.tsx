import * as React from "react";
import {TextInput, StyleSheet, View} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons"
import {useState} from "react";
import PropTypes from "prop-types"

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 18,
        borderColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
    ,
    textInput: {
        padding: 5,
        flex: 1,
        paddingVertical: 8,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#FFFFFF",
    },
    icon: {
        position: "relative",
        top: 5,

    },
    text: {
        color: "black"
    }
})

const PasswordInputText = (props: any): JSX.Element => {

    const {iconName, iconSize, iconColor, secureTextEntry, placeholder, onChangeText, value} = props

    const [initialFocus, setInitialFocus] = useState(false);
    const [eyeIcon, setEyeIcon] = useState("visibility-off");
    const [isPassword, setIsPassword] = useState(true);

    const changePwdType = () => {
        setEyeIcon(isPassword ? "visibility" : "visibility-off");
        setIsPassword(prevState => !prevState);
    };

    return (
        <View style={styles.container}>
            <Ionicons
                name={iconName}
                size={iconSize}
                color={iconColor}
            />
            <TextInput
                {...props}
                style={styles.textInput}
                secureTextEntry={isPassword}
                value={initialFocus ? value : "Password"}
                onFocus={() => setInitialFocus(true)}
            />
            <MaterialIcons
                style={styles.icon}
                name={eyeIcon}
                size={iconSize}
                color={iconColor}
                onPress={changePwdType}
            />
        </View>
    );
};

PasswordInputText.defaultProps = {
    iconSize: 25,
    placeholder: "Password",
    iconColor: "#222222",
    iconName: "lock-closed",
};

PasswordInputText.propTypes = {
    iconSize: PropTypes.number,
    value: PropTypes.string,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
    onChangeText: PropTypes.func,
};

export default PasswordInputText;

