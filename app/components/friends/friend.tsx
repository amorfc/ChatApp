import * as React from "react"
import {Image, StyleSheet, Text, View} from "react-native";


const styles = StyleSheet.create({
    main_container: {
        flexDirection: "row",
        padding:10
    },
    image_container: {
        justifyContent:"center",
        alignItems:"center"
    },
    info_container: {
        flex:1,
        flexDirection: "column",
        paddingHorizontal:20,
        paddingVertical:10
    },
    tinyLogo: {
        width: 70,
        height: 70,
        borderRadius:50
    },
})

const Friend = (props: any): JSX.Element => {

    const {friend} = props

    return (
        <View style={styles.main_container}>
            <View style={styles.image_container}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}/>
            </View>
            <View style={styles.info_container}>
                <Text>{friend.username}</Text>
                <Text>last seen today at 15:41</Text>
            </View>
        </View>
    )
}


export default Friend
