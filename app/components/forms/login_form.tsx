import * as React from "react"
import {useState} from "react";
import {TextInput} from "react-native-gesture-handler";
import * as Yup from "yup"
import {FormikValues, Formik} from "formik";
import {StyleSheet, Text, View} from "react-native";
import IconTextInput from "../text_inputs/icon_text_input";
import I18nContext from "../../config/i18n-polyglot";
import HiddenIconTextInput from "../text_inputs/hidden_text_input";
import StyleGuide from "../../style/StyleGuide";

const USERNAME_FIELD_NAME = "username"
const PASSWORD_FIELD_NAME = "password"

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username Required").min(4, "Username is Too Short").max(10, "Username is Too Long"),
    password: Yup.string().required("Password Required").min(4, "Password Must Be Longer Then 4 Char")
})

const LoginForm = (props: any) => {
    const initialValues: FormikValues = {
        username: '',
        password: ''
    }
    const onSubmitHandler = (values: FormikValues) => {
        console.log(values)
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitHandler}
        >{({
               handleBlur,
               handleChange,
               values,
               handleSubmit
           }) => (
            <View style={styles.formMainContainer}>
                <IconTextInput
                    onChangeText={handleChange(PASSWORD_FIELD_NAME)}
                    onBlur={handleBlur(PASSWORD_FIELD_NAME)}
                    value={values.username}
                    iconName={"at-circle-sharp"}
                    iconSize={24}
                    iconColor={StyleGuide.IconColor}
                    placeholder={"Username"}
                    placeholderTextColor={"darkgray"}
                />
                <HiddenIconTextInput
                    onChangeText={handleChange(USERNAME_FIELD_NAME)}
                    onBlur={handleBlur(USERNAME_FIELD_NAME)}
                    value={values.username}
                    iconName={"lock-closed"}
                    iconSize={24}
                    iconColor={StyleGuide.IconColor}
                    placeholder={I18nContext.polyglot?.t("password")}
                    secureTextEntry={true}
                />
                <View style={{marginHorizontal: 8,marginVertical:40}}>
                    <Text style={{color: "darkgray"}}>
                        {I18nContext.polyglot?.t("forgot_password")}
                    </Text>
                </View>
            </View>
        )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    formMainContainer: {
        flex: 1,
    }
})


export default LoginForm
