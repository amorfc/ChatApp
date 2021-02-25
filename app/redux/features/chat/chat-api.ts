import {signalRConnection} from "../../../services/signalR-service";
import {HubConnection} from "@microsoft/signalr";

let hubConnection:HubConnection

export const chat_api_connection = ():HubConnection => {
    try{
        hubConnection = signalRConnection().build()
        return hubConnection
    }catch (e){
        console.log("Chat Api Build Error "+e)
        return e
    }
}
