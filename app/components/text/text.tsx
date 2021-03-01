import React from "react";
import {Text} from "react-native";
import PropTypes from "prop-types";
// import { ThemeContext } from "../../config/theming";

const ChatAppText = (props: any): JSX.Element => {
    // const theme = ThemeContext.useTheme(props.theme);
    const {fontWeight, size, padding} = props;

    return (
        <Text
            style={{
                // color: theme.text.colors.primary,
                fontWeight,
                fontSize: size,
                paddingBottom: padding.bottom
            }}
        >
            {props.text}
        </Text>
    );
};

ChatAppText.defaultProps = {
    size: 14,
    text: "",
    fontWeight: "normal",
    padding: {},
    theme: null
};

ChatAppText.propTypes = {
    size: PropTypes.number,
    text: PropTypes.string,
    fontWeight: PropTypes.string,
    padding: PropTypes.object,
    theme: PropTypes.object
};

export default ChatAppText;
