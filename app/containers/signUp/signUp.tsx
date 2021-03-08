import * as React from "react";
import {View, StyleSheet, Text} from "react-native";

//Redux
import {AuthStateType} from "../../redux/features/auth/auth-types";
import {
    changeEmail,
    changeFirstName,
    changeLastName,
    changePassword,
    changeUsername,
    clearSignUpForm,
    signUpProcess
} from "../../redux/features/auth/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";

//Components
import HiddenIconTextInput from "../../components/text_inputs/hidden_text_input"
import IconTextInput from "../../components/text_inputs/icon_text_input";
import PrimaryBtn from "../../components/buttons/primary_btn";
import Loader from "../../components/loader/Loader";

//navigation ref
import {navigate} from "../../navigation/navigation";
//Polyglot Language Context
import I18nContext from "../../config/i18n-polyglot";
import {useEffect} from "react";

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
        height: 120,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomContainer: {
        flex: 2,
        paddingTop: 40,
        paddingHorizontal: 32,
    },
    inputContainer: {
        marginVertical: 5
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20
    },
    successText: {
        fontSize: 14,
    },
    goToLoginContainer: {
        paddingTop: 20
    }
});

const signUpFormScreen = (authState: AuthStateType) => {

    const dispatch = useDispatch();

    return (
        <>
            <View style={styles.inputContainer}>
                <IconTextInput
                    iconName={"at-circle-sharp"}
                    iconSize={24}
                    iconColor={"darkgray"}
                    placeholder={I18nContext.polyglot?.t("user_name")}
                    placeholderTextColor={"darkgray"}
                    value={authState.username}
                    onChangeText={(text: string) => dispatch(changeUsername(text))}/>
            </View>
            <View style={styles.inputContainer}>
                <HiddenIconTextInput
                    iconName={"lock-closed"}
                    iconSize={24}
                    iconColor={"darkgray"}
                    placeholder={I18nContext.polyglot?.t("password")}
                    value={authState.password}
                    onChangeText={(text: string) => dispatch(changePassword(text))}/>
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <PrimaryBtn
                        text={I18nContext.polyglot?.t("sign_up")}
                        onPress={() => {
                            dispatch(signUpProcess(authState));
                        }}/>
                </View>
            </View></>
    )
}

const signUpSuccessScreen = () => {

    const dispatch = useDispatch()

    return (
        <View>
            <Text style={styles.successText}>
                {I18nContext.polyglot?.t("sign_up_success_message")}
            </Text>
            <View style={styles.goToLoginContainer}>
                <PrimaryBtn text={I18nContext.polyglot?.t("go_to_login")} onPress={() => {
                    dispatch(clearSignUpForm(null))
                    navigate("LoginScreen", null)
                }}/>
            </View>
        </View>
    )
}

export default function SignUpScreen(): JSX.Element {

    const dispatch = useDispatch()
    const authState: AuthStateType = useSelector((state: RootStateType) => state.auth)
    useEffect(()=>{
        return ()=>{
            console.log("SignUpScreenUnMount")
        }
    },[])
    return (
        <View style={styles.mainContainer}>
            <Loader loading={authState.isAuthStatusLoading}/>
            <View style={styles.topContainer}>
                <Text>SignUpScreen</Text>
            </View>
            <View style={styles.bottomContainer}>
                {
                    authState.signupSuccess ? signUpSuccessScreen() : signUpFormScreen(authState)
                }
            </View>
        </View>
    );
}
