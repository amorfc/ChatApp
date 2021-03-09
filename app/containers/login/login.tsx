import * as React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    Button,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform, Dimensions
} from "react-native";
// import { I18nContext } from "../../config/i18n";

//Components
import IconTextInput from "../../components/text_inputs/icon_text_input"
import HiddenIconTextInput from "../../components/text_inputs/hidden_text_input"
import PrimaryButton from "../../components/buttons/primary_btn"

import {useDispatch, useSelector} from "react-redux";
import {AuthStateType} from "../../redux/features/auth/auth-types";
import {RootStateType} from "../../redux/root-reducers";
import {changePassword, changeUsername, loginAT} from "../../redux/features/auth/auth-reducer";
import Loader from "../../components/loader/Loader";
import I18nContext from "../../config/i18n-polyglot";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 0,
    },
    keyboardAvoidViewContentStyle:{
        flex:1
    },
    mainContainer: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        // backgroundColor: "white",
        backgroundColor: "yellow"
    },
    topContainer: {
        height: Dimensions.get("window").height / 4,
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'blue'
    },
    bottomContainer: {
        height: Dimensions.get("window").height / 4 * 3,
        width: Dimensions.get("window").width,
        paddingTop: 40,
        paddingHorizontal: 32,
        backgroundColor: "red"
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

    const dispatch = useDispatch()
    const authState: AuthStateType = useSelector((state: RootStateType) => state.auth)

    return (
            <View style={styles.mainContainer}>
                <Loader loading={authState.isAuthStatusLoading}/>
                <View style={styles.topContainer}>
                    <Text>LoginScreen</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{paddingBottom: 15}}>
                        <IconTextInput
                            iconName={"at-circle-sharp"}
                            iconSize={24}
                            iconColor={"darkgray"}
                            placeholder={"Username"}
                            placeholderTextColor={"darkgray"}
                            value={authState.username}
                            onChangeText={(text: string) => dispatch(changeUsername(text))}
                        />
                    </View>
                    <View style={{paddingBottom: 30}}>
                        <HiddenIconTextInput
                            iconName={"lock-closed"}
                            iconSize={22}
                            iconColor={"grey"}
                            placeholder={I18nContext.polyglot?.t("password")}
                            secureTextEntry={true}
                            value={authState.password}
                            onChangeText={(text: string) => dispatch(changePassword(text))}
                        />
                    </View>
                    <View style={{paddingBottom: 20}}>
                        <PrimaryButton
                            text={I18nContext.polyglot?.t("log_in")}
                            onPress={() => {
                                dispatch(loginAT({username: authState.username, password: authState.password}))
                            }}
                        />
                    </View>
                    <View style={{marginHorizontal: 8}}>
                        <Text style={{color: "darkgray"}}>
                            {I18nContext.polyglot?.t("forgot_password")}
                        </Text>
                    </View>
                </View>
            </View>
    );
}
