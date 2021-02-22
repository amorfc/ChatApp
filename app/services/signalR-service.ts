import * as signalR from "@microsoft/signalr"
import {GlobalConstants} from "../config/global-constans";
import {HttpTransportType, HubConnectionBuilder} from "@microsoft/signalr";


export const signalRConnection = ():HubConnectionBuilder => new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.43.53:8038/messagehub", {
        accessTokenFactory: (): string | Promise<string> => GlobalConstants.authToken,
        skipNegotiation:true,
        transport: HttpTransportType.WebSockets
    })
