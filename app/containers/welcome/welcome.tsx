import * as React from "react";
import {View, StyleSheet, Text, Image, Button} from "react-native";
import {navigate} from "../../navigation/navigation";
import PrimaryBtn from "../../components/buttons/primary_btn";
import I18nContext from "../../config/i18n-polyglot";
import StyleGuide from "../../style/StyleGuide";
// import { I18nContext } from "../../config/i18n";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 0,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: StyleGuide.PrimaryBGColor,
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

export default function WelcomeScreen() {

    function loginBtnPressed() {
        navigate("LoginScreen", null)
    }

    function signUpBtnPressed() {
        navigate("SignUpScreen", null)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text>WelcomeScreen</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{paddingBottom:20}}>
                    <PrimaryBtn
                        text={I18nContext.polyglot?.t("log_in")}
                        onPress={loginBtnPressed}
                    />
                </View>
                <View style={{paddingBottom:20}} >
                    <PrimaryBtn
                        text={I18nContext.polyglot?.t("sign_up")}
                        onPress={signUpBtnPressed}
                    />
                </View>
            </View>
        </View>
    );
}
