import * as signalR from "@microsoft/signalr"
import {GlobalConstants} from "../config/global-constans";
import {HttpTransportType, HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Message} from "react-native-flash-message";
import {MessageServiceConstants} from "../database/Constants";


interface MessageService {
    sendPrivateMessage(message: Message,sendPrivateMessageCallback:Function): void;

    sendGroupMessage(message: Message,sendGroupMessageCallback:Function): void;

}

let signalRConnectionInstance: undefined | HubConnection = undefined;


const sendPrivateMessage = async (message: Message,sendPrivateMessageCallback:Function) => {
    try {

        const connection = await getConnection()

        const res = await connection.invoke("SendPrivateMessage", message)
        console.log(`Message Send  --- ${res}`)
        sendPrivateMessageCallback()

    } catch (e) {
        console.log(`Message Could Not Send ${e}`)
    }
}

const sendGroupMessage = async (message: Message,sendGroupMessageCallback:Function) => {
    try {

        const connection = await getConnection()
        const res = await connection.invoke("SendGroupMessage", message)
        console.log(`Message Send  --- ${res}`)
        sendGroupMessageCallback()

    } catch (e) {
        console.log(`Message Could Not Send ${e}`)
    }
}


const getConnection = async (): Promise<HubConnection> => {

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

export const signalRService: MessageService = {
    sendPrivateMessage,
    sendGroupMessage
}
