import { MessageType } from "./MessageType";

export interface Chat {
    chat_id:number,
    friend_id:number | null,
    text:"",
}
