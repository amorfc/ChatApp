import * as React from "react";
import {View, StyleSheet, Text, Image, Button, TextInput} from "react-native";
// import { I18nContext } from "../../config/i18n";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 0,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    topContainer: {
        height: 320,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomContainer: {
        flex: 2,
        paddingTop: 40,
        paddingHorizontal: 32,
    },
    input: {
        padding: 5,
        flex: 1,
        paddingVertical: 8,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#FFFFFF",
    },
});

export default function LoginScreen() {
    function renderLoginForm() {
        return(
            <View>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                />
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer} >
                <Text>LoginScreen</Text>
            </View>
            <View style={styles.bottomContainer} >
                {renderLoginForm()}
            </View>
        </View>
    );
}
