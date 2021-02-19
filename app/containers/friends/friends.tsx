import * as React from "react";
import {View, StyleSheet, Text, Image, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";

//Components
import FriendsList from "../../components/friends/friends_list";
import {useEffect} from "react";
import {fetchAllFriends} from "../../redux/features/user/user-reducer";


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
        height: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomContainer: {
        flex: 1,
    },
});

export default function FriendsScreen() {
    const dispatch = useDispatch()

    const authState = useSelector((state:RootStateType) => state.auth)
    const userState = useSelector((state:RootStateType) => state.user)

    useEffect(()=>{
        dispatch(fetchAllFriends(null))
    },[])

    return (
        <View style={styles.mainContainer}>
            <Text>{authState.user?.username} Friends Screen</Text>
            <View style={styles.topContainer} >
                <Text>Search And Add Friends Section</Text>
            </View>
            <View style={styles.bottomContainer} >
                <FriendsList friendsData={userState.friends} />
            </View>
        </View>
    );
}
