import * as React from "react";
import {View, StyleSheet, Text, Image, Button, TextInput} from "react-native";
// import { I18nContext } from "../../config/i18n";

//Components
import IconTextInput from "../../components/text_inputs/icon_text_input"
import HiddenIconTextInput from "../../components/text_inputs/hidden_text_input"
import PrimaryButton from "../../components/buttons/primary_btn"

import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "../../redux/features/auth/auth-types";
import {RootStateType} from "../../redux/root-reducers";
import {changeEmail, changePassword} from "../../redux/features/auth/auth-reducer";

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

    const dispatch = useDispatch()
    const authState: AuthState = useSelector((state: RootStateType) => state.auth)

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text>LoginScreen</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{paddingBottom: 15}}>
                    <IconTextInput
                        iconName={"at-circle-sharp"}
                        iconSize={24}
                        iconColor={"darkgray"}
                        placeholder={"Email"}
                        placeholderTextColor={"darkgray"}
                        value={authState.email}
                        onChangeText={(text: string) => dispatch(changeEmail(text))}
                    />
                </View>
                <View style={{paddingBottom: 30}} >
                    <HiddenIconTextInput
                        iconName={"lock-closed"}
                        iconSize={22}
                        iconColor={"grey"}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        value={authState.password}
                        onChangeText={(text: string) => dispatch(changePassword(text))}
                    />
                </View>
                <View style={{paddingBottom: 20}}>
                    <PrimaryButton
                        text={"Login"}
                        onPress={()=>{
                            console.log("LoginButton Pressed")}}
                    />
                </View>
                <View style={{ marginHorizontal: 8 }}>
                    <Text style={{color:"darkgray"}} >
                        Forgot Password?
                    </Text>
                </View>
            </View>
        </View>
    );
}
