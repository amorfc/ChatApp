import * as React from "react";
import {View, StyleSheet, Text} from "react-native";

//Redux
import {AuthStateType} from "../../redux/features/auth/auth-types";
import { useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";

//Components

//navigation ref
//Polyglot Language Context
import {useEffect} from "react";
import StyleGuide from "../../style/StyleGuide";
import {SignUpForm} from "../../components/forms/sign_up_form";
import {SignUpSuccess} from "./sign_up_success";

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
});

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
                    authState.signupSuccess ? <SignUpSuccess /> : <SignUpForm isAuthStatusLoading={authState.isAuthStatusLoading} />
                }
            </View>
        </View>
    );
}
