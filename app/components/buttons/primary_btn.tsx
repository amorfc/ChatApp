import * as React from "react"
import {ActivityIndicator, Pressable, StyleSheet, Text} from "react-native";
import PropTypes from "prop-types"
import StyleGuide from "../../style/StyleGuide";

const PrimaryBtn = (props: any) => {

    const {text, onPress, disabled, isLoading} = props

    return (
        <Pressable
            style={[styles.primary_btn]}
            onPress={onPress}
            disabled={disabled}
        >
            {isLoading ?
                <ActivityIndicator size={"small"} color={StyleGuide.PrimaryBGColor}/> :
                <Text>
                    {text}
                </Text>
            }
        </Pressable>

    )
}

const styles = StyleSheet.create({
    primary_btn: {
        height: 35,
        padding: 5,
        marginVertical: 5,
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: StyleGuide.PrimaryBtnColor,
        justifyContent: "center",
        alignItems: "center"
    }
})


PrimaryBtn.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool
}


export default PrimaryBtn

