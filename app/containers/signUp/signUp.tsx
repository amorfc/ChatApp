import * as React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
// import { I18nContext } from "../../config/i18n";

//Redux
import {AuthState} from "../../redux/features/auth/auth-types";
import {
    changeEmail,
    changeFirstName,
    changeLastName,
    changePassword,
    signUpProcess
} from "../../redux/features/auth/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";

//Components
import HiddenIconTextInput from "../../components/text_inputs/hidden_text_input"
import IconTextInput from "../../components/text_inputs/icon_text_input";
import PrimaryBtn from "../../components/buttons/primary_btn";
import {navigate} from "../../navigation/navigation";
import Loader from "../../components/loader/Loader";

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

const signUpFormScreen = (authState: AuthState)=>{

    const dispatch = useDispatch();

    return(
        <><View style={styles.inputContainer}>
            <IconTextInput
                iconName={"person"}
                iconSize={24}
                iconColor={"darkgray"}
                placeholder={"First Name"}
                placeholderTextColor={"darkgray"}
                value={authState.firstname}
                onChangeText={(text: string) => dispatch(changeFirstName(text))}/>
        </View><View style={styles.inputContainer}>
            <IconTextInput
                iconName={"person"}
                iconSize={24}
                iconColor={"darkgray"}
                placeholder={"Last Name"}
                placeholderTextColor={"darkgray"}
                value={authState.lastname}
                onChangeText={(text: string) => dispatch(changeLastName(text))}/>
        </View><View style={styles.inputContainer}>
            <IconTextInput
                iconName={"at-circle-sharp"}
                iconSize={24}
                iconColor={"darkgray"}
                placeholder={"Email"}
                placeholderTextColor={"darkgray"}
                value={authState.email}
                onChangeText={(text: string) => dispatch(changeEmail(text))}/>
        </View><View style={styles.inputContainer}>
            <HiddenIconTextInput
                iconName={"lock-closed"}
                iconSize={24}
                iconColor={"darkgray"}
                placeholder={"Password"}
                value={authState.password}
                onChangeText={(text: string) => dispatch(changePassword(text))}/>
        </View>
            <View style={styles.buttonContainer}>
                <View>
                    <PrimaryBtn
                        text={"Sign Up"}
                        onPress={() => {
                            dispatch(signUpProcess(authState));
                        }}/>
                </View>
            </View></>
    )
}

const signUpSuccessScreen = () => {
    return (
        <View>
            <Text style={styles.successText}>
                Signup is successful, Please Login!
            </Text>
            <View style={styles.goToLoginContainer}>
                <PrimaryBtn text={"Go to login"} onPress={() => navigate("LoginScreen", null)}/>
            </View>
        </View>
    )
}

export default function SignUpScreen(): JSX.Element {

    const dispatch = useDispatch()
    const authState: AuthState = useSelector((state: RootStateType) => state.auth)

    return (
        <View style={styles.mainContainer}>
            <Loader loading={authState.isAuthStatusLoading} />
            <View style={styles.topContainer}>
                <Text>SignUpScreen</Text>
            </View>
            <View style={styles.bottomContainer}>
                {
                    authState.signupSuccess ? signUpSuccessScreen():signUpFormScreen(authState)
                }
            </View>
        </View>
    );
}
