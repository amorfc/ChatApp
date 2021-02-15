import * as React from "react";
import {View, StyleSheet, Text, Image, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";


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
});

export default function ChatsScreen() {
    const dispatch = useDispatch()
    const authState = useSelector((state:RootStateType) => state.auth)

    return (
        <View style={styles.mainContainer}>
            <Text>ChatsScreen+ {authState.firstname}</Text>
            <Button title={"Osman"} onPress={()=>{}}/>
        </View>
    );
}
