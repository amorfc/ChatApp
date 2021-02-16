import * as React from "react";
import {View, StyleSheet, Text, Image, Button, TextInput} from "react-native";
// import { I18nContext } from "../../config/i18n";

//Components
import IconTextInput from "../../components/icon_text_input"
import HiddenIconTextInput from "../../components/hidden_text_input"
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
                <View>
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
            </View>
        </View>
    );
}
