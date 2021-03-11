import * as React from "react";
import {View, StyleSheet, Text} from "react-native";

//Redux
import {AuthStateType} from "../../redux/features/auth/auth-types";
import {
    clearSignUpForm,
} from "../../redux/features/auth/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";

//Components
import PrimaryBtn from "../../components/buttons/primary_btn";

//navigation ref
import {navigate} from "../../navigation/navigation";
//Polyglot Language Context
import I18nContext from "../../config/i18n-polyglot";
import {useEffect} from "react";
import StyleGuide from "../../style/StyleGuide";
import {SignUpForm} from "../../components/forms/sign_up_form";

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

    const authState: AuthStateType = useSelector((state: RootStateType) => state.auth)
    useEffect(()=>{
        return ()=>{
            console.log("SignUpScreenUnMount")
        }
    },[])
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text>SignUpScreen</Text>
            </View>
            <View style={styles.bottomContainer}>
                {
                    authState.signupSuccess ? signUpSuccessScreen() : <SignUpForm/>
                }
            </View>
        </View>
    );
}
