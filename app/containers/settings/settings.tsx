import * as React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import PrimaryBtn from "../../components/buttons/primary_btn";
import I18nContext from "../../config/i18n-polyglot";
import {useDispatch} from "react-redux";
import {loginAT, logoutAT} from "../../redux/features/auth/auth-reducer";
// import { I18nContext } from "../../config/i18n";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 0,
    },
    mainContainer: {
        flex: 1,
        //for test
        justifyContent: "center",
        alignItems: "center",
        ///
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

export default function SettingsScreen() {

    const dispatch = useDispatch()

    return (
        <View style={styles.mainContainer}>
            <Text>SettingsScreen</Text>
            <PrimaryBtn
                text={I18nContext.polyglot?.t("log_out")}
                onPress={() => {
                    dispatch(logoutAT(null))
                }} />
        </View>
    );
}
