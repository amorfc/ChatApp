import React, {useRef, useState} from 'react'
import {Button, FlatList, Pressable} from 'react-native'
import {View, Text, StyleSheet} from 'react-native'
import {MessageModel} from "../../models/message-model";
import MessageComponent from "./message_component";
import PrimaryBtn from "../buttons/primary_btn";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";
import IconButton from "../buttons/icon_button";

const MessageList = (props: any) => {

    const {allMessages} = props

    let flatListRef = useRef<FlatList<any> | null>()
    const [scrollToEndButtonVisibility, setScrollToEndButtonVisibility] = useState(false)


    const scrollToLastMessage = () => {
        flatListRef?.current?.scrollToOffset({
            offset: 0,
            animated: true
        })
    }
    const renderItem = ({item: message}: { item: MessageModel }) => <MessageComponent message={message}/>
    return (
        <View style={styles.main_container}>
            <FlatList
                ref={(ref) => flatListRef.current = ref}
                data={allMessages}
                keyExtractor={(item => item.timeToSend)}
                renderItem={renderItem}
                inverted
                onScroll={(e) => {
                    e.nativeEvent.contentOffset.y > 0 ? setScrollToEndButtonVisibility(true) : setScrollToEndButtonVisibility(false)
                }}
                initialNumToRender={20}
            />
            {
                scrollToEndButtonVisibility ? (
                    <IconButton onPress={() => scrollToLastMessage()}
                                iconStyle={styles.fab}
                                iconName={"chevron-down-outline"}
                                iconSize={22}
                                iconColor={"black"} />
                ) : null
            }
        </View>
    )
}
const styles = StyleSheet.create(
    {
        main_container: {
            flex: 1,
        },
        chatContainer: {
            flex: 1
        },
        fab: {
            position: 'absolute',
            right: 20,
            bottom: 60,
            backgroundColor: 'rgba(33, 33, 33, 0.50)',
            borderRadius: 30,
            elevation: 8
        },
    }
)
export default React.memo(MessageList)
