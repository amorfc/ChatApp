import * as React from "react";
import {TextInput, StyleSheet, View} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons"
import {useState} from "react";
import PropTypes from "prop-types"
import StyleGuide from "../../style/StyleGuide";

const styles = StyleSheet.create({
    container: {
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
        borderRadius:10,
        color:"white",
        backgroundColor: StyleGuide.SecondaryBGColor,
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

    const {iconName, iconSize, iconColor, value} = props

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
                style={{paddingLeft: 5}}
            />
            <TextInput
                {...props}
                style={styles.textInput}
                secureTextEntry={isPassword}
                value={initialFocus ? value : "Password"}
                onFocus={() => setInitialFocus(true)}
                placeholderTextColor={"white"}
                selectionColor={"white"}
            >
                {/*<MaterialIcons*/}
                {/*    style={styles.icon}*/}
                {/*    name={eyeIcon}*/}
                {/*    size={iconSize}*/}
                {/*    color={iconColor}*/}
                {/*    onPress={changePwdType}*/}
                {/*/>*/}
            </TextInput>
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
    secureTextEntry: PropTypes.bool,

};

export default PasswordInputText;

