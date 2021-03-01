import { Message } from "./Message";

export interface Chat {
    chat_id:number,
    friend_id:number | null,
    text:"",
}