import * as React from "react";
import {View, StyleSheet, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";

//Components
import FriendsList from "../../components/friends/friends_list";
import {useEffect} from "react";
import {fetchAllFriendsFromRemote, refreshFriendsAT} from "../../redux/features/user/user-reducer";
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
        height: 70,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#00b8ae"
    },
    bottomContainer: {
        flex: 1,
    },
});

export default function FriendsScreen(props:any) {

    const dispatch = useDispatch()
    // const authState = useSelector((state:RootStateType) => state.auth)
    const userState = useSelector((state:RootStateType) => state.user)
    useEffect(() =>{

        dispatch(refreshFriendsAT(null))

    },[])
    console.log("Friends Screen Rendering")
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer} >
                <Text>Search Section</Text>
            </View>
            <View style={styles.bottomContainer} >
                <FriendsList friendsData={userState.friends} />
            </View>
        </View>
    );
}
