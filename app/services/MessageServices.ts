import * as signalR from "@microsoft/signalr"
import {GlobalConstants} from "../config/global-constans";
import {HttpTransportType, HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Message} from "react-native-flash-message";
import {MessageServiceConstants} from "../database/Constants";
import {SenderMessageType} from "../redux/features/chat/chat-types";

const RECEIVE_MESSAGE_EVENT_NAME = "ReceiveMessage"

let signalRConnectionInstance: undefined | HubConnection = undefined;

interface MessageService {
    sendPrivateMessage(message: SenderMessageType, sendPrivateMessageCallback: Function | null): void;

    sendGroupMessage(message: Message, sendGroupMessageCallback: Function | null): void;

    setReceiveMessageHandler(receiveMessageHandler: Function): void;

}

const sendPrivateMessage = async (message: SenderMessageType, sendPrivateMessageCallback: Function | null) => {
    try {

        const connection = await getMessageServiceConnection()

        await connection.invoke("SendPrivateMessage", message)
        console.log(`Message Send`)

        if (sendPrivateMessageCallback) sendPrivateMessageCallback()

    } catch (e) {
        console.log(`Message Could Not Send ${e}`)
    }
}

const sendGroupMessage = async (message: Message, sendGroupMessageCallback: Function | null) => {
    try {

        const connection = await getMessageServiceConnection()
        const res = await connection.invoke("SendGroupMessage", message)
        console.log(`Message Send  --- ${res}`)
        if (sendGroupMessageCallback) sendGroupMessageCallback()
    } catch (e) {
        console.log(`Message Could Not Send ${e}`)
    }
}

const setReceiveMessageHandler = async (receiveMessageHandler: Function) => {
    try {
        //If there is a already set same event remove it
        const connection = await getMessageServiceConnection()
        connection.off(RECEIVE_MESSAGE_EVENT_NAME)
        connection.on(RECEIVE_MESSAGE_EVENT_NAME, (Message) => receiveMessageHandler(Message))
    } catch (e) {
        console.log(`Message Receive but error occurred -> Error: ${e}`)
    }
}

const getMessageServiceConnection = async (): Promise<HubConnection> => {

    if (signalRConnectionInstance) return Promise.resolve(signalRConnectionInstance)
    try {
        signalRConnectionInstance = signalRConnectionBuilder()
        await signalRConnectionInstance.start()

        return Promise.resolve(signalRConnectionInstance)

    } catch (e) {
        return Promise.reject(e)
    }
}


const signalRConnectionBuilder = (): HubConnection => {

    const signalRConfig = {
        accessTokenFactory(): string | Promise<string> {
            return GlobalConstants.authToken
        }
    }
    signalRConnectionInstance = new signalR.HubConnectionBuilder()
        .withUrl(MessageServiceConstants.signalRHubUrl, signalRConfig)
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build()

    return signalRConnectionInstance

}

export const signalRMessageService: MessageService = {
    sendPrivateMessage,
    sendGroupMessage,
    setReceiveMessageHandler
}
