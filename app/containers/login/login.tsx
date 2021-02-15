import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
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
});

export default function LoginScreen() {
    return (
        <View style={styles.mainContainer}>
            <Text>LoginScreen</Text>
        </View>
    );
}
