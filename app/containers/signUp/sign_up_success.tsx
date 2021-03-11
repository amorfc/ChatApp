import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from "react-redux";
import I18nContext from "../../config/i18n-polyglot";
import PrimaryBtn from "../../components/buttons/primary_btn";
import {clearSignUpForm} from "../../redux/features/auth/auth-reducer";
import {navigate} from "../../navigation/navigation";

export const SignUpSuccess = () => {

    const dispatch = useDispatch()

    return (<View>
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
    );
}

const styles = StyleSheet.create({
    successText: {
        fontSize: 14,
    },
    goToLoginContainer: {
        paddingTop: 20
    }
})

