import * as React from "react"
import {useState} from "react";
import {TextInput} from "react-native-gesture-handler";
import * as Yup from "yup"
import {FormikValues, Formik, useFormik} from "formik";
import {StyleSheet, Text, View} from "react-native";
import IconTextInput from "../text_inputs/icon_text_input";
import I18nContext from "../../config/i18n-polyglot";
import HiddenIconTextInput from "../text_inputs/hidden_text_input";
import StyleGuide from "../../style/StyleGuide";
import PrimaryBtn from "../buttons/primary_btn";
import {signUpAT} from "../../redux/features/auth/auth-reducer";

const USERNAME_FIELD_NAME = "username"
const PASSWORD_FIELD_NAME = "password"

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username Required").min(4, "Username is Too Short").max(10, "Username is Too Long"),
    password: Yup.string().required("Password Required").min(4, "Password Must Be Longer Then 4 Char")
})

const LoginForm = (props: any) => {

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })
    const onSubmitHandler = (values: FormikValues) => {
        console.log(values)
    }
    return (

        <View style={styles.formMainContainer}>
            <IconTextInput
                onChangeText={handleChange(USERNAME_FIELD_NAME)}
                onBlur={handleBlur(USERNAME_FIELD_NAME)}
                value={values.username}
                iconName={"at-circle-sharp"}
                iconSize={24}
                iconColor={StyleGuide.IconColor}
                placeholder={"Username"}
                placeholderTextColor={"darkgray"}
                error={errors.username}
                touched={touched.username}
            />
            <HiddenIconTextInput
                onChangeText={handleChange(PASSWORD_FIELD_NAME)}
                onBlur={handleBlur(PASSWORD_FIELD_NAME)}
                value={values.password}
                iconName={"lock-closed"}
                iconSize={24}
                iconColor={StyleGuide.IconColor}
                placeholder={I18nContext.polyglot?.t("password")}
                secureTextEntry={true}
                error={errors.password}
                touched={touched.password}
            />
            <View>
                <PrimaryBtn
                    text={I18nContext.polyglot?.t("log_in")}
                    onPress={() => {
                        // dispatch(signUpAT(authState));
                    }}/>
            </View>
            <View style={{marginHorizontal: 8, marginVertical: 40}}>
                <Text style={{color: "darkgray"}}>
                    {
                        I18nContext.polyglot?.t("forgot_password")
                    }
                </Text>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    formMainContainer:
        {
            flex: 1,
        }
})


export default LoginForm
