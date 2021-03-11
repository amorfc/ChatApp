import * as React from "react"
import {useFormik} from "formik";
import * as Yup from "yup"
import {StyleSheet, View} from "react-native";
import IconTextInput from "../text_inputs/icon_text_input";
import I18nContext from "../../config/i18n-polyglot";
import StyleGuide from "../../style/StyleGuide";
import HiddenIconTextInput from "../text_inputs/hidden_text_input";
import PrimaryBtn from "../buttons/primary_btn";
import {AuthStateType, UserCredentials} from "../../redux/features/auth/auth-types";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/root-reducers";
import {signUpAT} from "../../redux/features/auth/auth-reducer";

const USERNAME_FIELD_NAME = "username"
const PASSWORD_FIELD_NAME = "password"

const SignUpFormSchema = Yup.object().shape({
    username: Yup.string().required("Username Required").min(4, "Username is Too Short").max(20, "Username is Too Long"),
    password: Yup.string().required("Username Required").min(4, "Password Must Be Longer Then 4 Char")
})

const initialValues = {
    username: '',
    password: ''
}

export const SignUpForm = (props: any) => {

    const authState:AuthStateType = useSelector((state:RootStateType)=>state.auth)
    const dispatch = useDispatch()


    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        initialValues,
        validationSchema: SignUpFormSchema,
        onSubmit: (values) => {
            const newUserCredentials:UserCredentials = {...values}
            dispatch(signUpAT(newUserCredentials))
        }
    })

    return (
        <View style={styles.formMainContainer}>
            <IconTextInput
                onChangeText={handleChange(USERNAME_FIELD_NAME)}
                onBlur={handleBlur(USERNAME_FIELD_NAME)}
                value={values.username}
                error={errors.username}
                touched={touched.username}
                placeholder={I18nContext.polyglot?.t("user_name")}
                placeholderTextColor={"darkgray"}
                iconName={"at-circle-sharp"}
                iconSize={24}
                iconColor={StyleGuide.PrimaryIconColor}
            />
            <HiddenIconTextInput
                onChangeText={handleChange(PASSWORD_FIELD_NAME)}
                onBlur={handleBlur(PASSWORD_FIELD_NAME)}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                placeholder={I18nContext.polyglot?.t("password")}
                placeholderTextColor={"darkgray"}
                iconName={"lock-closed"}
                iconSize={24}
                iconColor={StyleGuide.PrimaryIconColor}
            />
            <View  >
                <PrimaryBtn
                    text={I18nContext.polyglot?.t("sign_up")}
                    isLoading={authState.isAuthStatusLoading}
                    onPress={handleSubmit}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formMainContainer: {
        flex: 1,
    }
})


