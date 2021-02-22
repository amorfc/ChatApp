import * as React from "react";
import {View, StyleSheet, Text, Image, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";
import {doConnection} from "../../redux/features/chat/chat-reducer";
import IconTextInput from "../../components/text_inputs/icon_text_input";
import {changeEmail} from "../../redux/features/auth/auth-reducer";


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
    middleContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 32,
    },
    bottomContainer: {
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        paddingTop: 40,
        marginBottom:20,
        paddingHorizontal: 32,
    },
});

export default function ChatsScreen() {
    //HUB CONNECTION
    const dispatch = useDispatch()
    dispatch(doConnection(null))
    const authState = useSelector((state: RootStateType) => state.auth)

    return (
        <View style={styles.mainContainer}>
            <Text>ChatsScreen+ {authState.firstname}</Text>
            <Button title={"Osman"} onPress={() => {
            }}/>
            <View style={styles.middleContainer}>

            </View>
            <View style={styles.bottomContainer} >
                <IconTextInput
                    iconName={"at-circle-sharp"}
                    iconSize={24}
                    iconColor={"darkgray"}
                    placeholder={"Text"}
                    placeholderTextColor={"darkgray"}
                    value={authState.email}
                    onChangeText={(text: string) => dispatch(changeEmail(text))}/>
            </View>
        </View>
    );
}
