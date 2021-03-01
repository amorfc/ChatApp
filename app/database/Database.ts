import SQLite from 'react-native-sqlite-storage'
import { DATABASE } from "./Constants"
import { Friend } from "../types/Friend"
import { Chat } from '../types/Chat'
import { AppState, AppStateStatus } from 'react-native';
import { DatabaseInitialization } from './DatabaseInitialization';
import { Message } from '../types/Message';

export interface Database {
    //create
    createFriend(friend: Friend): Promise<void>;
    createChat(newChat: Chat): Promise<void>;
    createMessage(message: Message): Promise<void>;

    //Read
    getAllFriend(): Promise<Friend[]>;
    getAllMessages(chat: Chat): Promise<Message[]>;
    getSingleChatWithFriendId(friend_id: number): Promise<Chat>;
    getSingleFriendWithFriendId(friend_id: number): Promise<Friend>;
    getAllChat(): Promise<Chat[]>;
    getSingleFriendWithUsername(username: string): Promise<Friend>;
}


let databaseInstance: SQLite.SQLiteDatabase | undefined;

async function createFriend(friend: Friend): Promise<void> {
    return getDatabase()
        .then((db) => db.executeSql("INSERT INTO Friend (username) VALUES(?);", [friend.username]))
        .then(([results]) => {
            console.log(`[db] Friend "${friend.username}" created successfully with id: ${results.insertId}`);
        })
        .catch((reason: any) => {
            Promise.reject(reason);
        })
}

async function createChat(newChat: Chat): Promise<void> {
    return getDatabase()
        .then(db => {
            db.executeSql("INSERT INTO Chat (friend_id) VALUES(?);", [newChat.friend_id])
            db.executeSql("UPDATE Friend SET has_active_chat = ? WHERE friend_id = ? ;", [1, newChat.friend_id])
        })
        .catch((reason: any) => {
            Promise.reject(reason);
        })
}

async function createMessage(message: Message): Promise<void> {
    const { chat_id, content, senderUsername, receiverUsername, timeToSend, id } = message

    return getDatabase()
        .then(db => db.executeSql("INSERT INTO Message (chat_id, content, senderUsername, receiverUsername, timeToSend, id) VALUES(?,?,?,?,?,?);", [chat_id, content, senderUsername, receiverUsername, timeToSend, id]))
        .then(([results]) => {

        })
        .catch((reason: any) => {
            Promise.reject(reason);
        })
}

async function getSingleFriendWithFriendId(friend_id: number): Promise<Friend> {
    return getDatabase()
        .then((db) => db.executeSql("SELECT * FROM Friend WHERE friend_id = ? ;", [friend_id])
            .then(([results]) => {
                let friend: Friend = {
                    friend_id: 0,
                    username: "",
                    has_active_chat: 11111,
                    firstName: "",
                    lastName: "",
                    email: ""
                }
                if (results === undefined) {
                    return friend
                }

                const row = results.rows.item(0)
                const { friend_id, username, has_active_chat } = row
                friend = {
                    friend_id,
                    username,
                    has_active_chat,
                    firstName: "",
                    lastName: "",
                    email: ""
                }
                return friend
            })
        )
}
async function getAllFriend(): Promise<Friend[]> {
    return getDatabase()
        .then((db) => db.executeSql("SELECT * FROM Friend;"))
        .then(([results]) => {
            if (results === undefined) {
                return []
            }
            const count = results.rows.length
            const friendLists: Friend[] = []
            for (let i = 0; i < count; i++) {
                const row = results.rows.item(i);
                const { friend_id, username, has_active_chat } = row
                const friend: Friend = {
                    friend_id,
                    username,
                    has_active_chat,
                    firstName: "",
                    lastName: "",
                    email: ""
                }
                friendLists.push(friend)
            }
            return friendLists
        })
}

async function getAllMessages(chat: Chat): Promise<Message[]> {
    return getDatabase()
        .then((db) => db.executeSql("SELECT * FROM Message WHERE chat_id = ? ORDER BY timeToSend DESC;", [chat.chat_id]))
        .then(([results]) => {
            if (results === undefined) {
                return []
            }
            const count = results.rows.length
            const messageList: Message[] = []
            for (let i = 0; i < count; i++) {
                const row = results.rows.item(i);
                const { message_id, chat_id, content, senderUsername, receiverUsername, timeToSend, id } = row
                const message: Message = {
                    message_id,
                    chat_id, content,
                    senderUsername,
                    receiverUsername,
                    timeToSend,
                    id
                }
                messageList.push(message)
            }
            return messageList
        })
}

async function getAllChat(): Promise<Chat[]> {
    return getDatabase()
        .then((db) => db.executeSql("SELECT * FROM Chat;"))
        .then(([results]) => {
            if (results === undefined) {
                return []
            }
            const count = results.rows.length
            const chatLists: Chat[] = []
            for (let i = 0; i < count; i++) {
                const row = results.rows.item(i);
                const { chat_id, friend_id, text } = row
                const chat = {
                    chat_id,
                    friend_id,
                    text
                }
                chatLists.push(chat)
            }
            return chatLists
        })
}

async function getSingleChatWithFriendId(friend_id: number): Promise<Chat> {
    return getDatabase()
        .then((db) => db.executeSql("SELECT * FROM Chat WHERE friend_id = ? ;", [friend_id])
            .then(([results]) => {
                let chat: Chat = {
                    chat_id: 0,
                    friend_id: null,
                    text: "",
                }
                if (results === undefined) {
                    return chat
                }

                const row = results.rows.item(0)
                const { chat_id, friend_id, text } = row
                chat = {
                    chat_id,
                    friend_id,
                    text
                }
                return chat
            })
        )
}

async function getSingleFriendWithUsername(username: string): Promise<Friend> {
    return getDatabase()
        .then((db) => db.executeSql("SELECT * FROM Friend WHERE username = ?;", [username])
            .then(([results]) => {
                let friend: Friend = {
                    friend_id: 0,
                    username: "",
                    has_active_chat: 11111,
                    firstName: "",
                    lastName: "",
                    email: ""
                }
                if (results === undefined) {
                    Promise.reject("Invalid")
                }

                const row = results.rows.item(0)
                const { friend_id, username, has_active_chat } = row
                friend = {
                    friend_id,
                    username,
                    has_active_chat,
                    firstName: "",
                    lastName: "",
                    email: ""
                }
                return friend
            })
        )
}

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (databaseInstance !== undefined) {
        return Promise.resolve(databaseInstance)
    }
    //Open the database first
    return openDb()
}

async function openDb(): Promise<SQLite.SQLiteDatabase> {
    SQLite.DEBUG(true)
    SQLite.enablePromise(true)

    if (databaseInstance) {
        console.log("[db] Database is already open: returning the existing instance");
        return databaseInstance;
    }

    const db = await SQLite.openDatabase({
        name: DATABASE.FILE_NAME,
        location: 'Documents'
    })
    console.log("DB Opened")

    // Perform any database initialization or updates, if needed
    const databaseInitialization = new DatabaseInitialization();
    await databaseInitialization.updateDatabaseTables(db);

    databaseInstance = db

    return db

}

async function closeDb(): Promise<void> {
    if (databaseInstance === undefined) {
        console.log("Database already closed")
        return
    }

    await databaseInstance.close()
    console.log("[db] Database closed.");
    databaseInstance = undefined
}


let appState = "active"
console.log("[db] Adding listener to handle app state changes");
AppState.addEventListener("change", handleAppStateChange)

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
    if (appState === "active" && nextAppState.match(/inactive|background/)) {
        // App has moved from the foreground into the background (or become inactive)
        console.log("[db] App has gone to the background - closing DB connection.");
        closeDb();
    }
    appState = nextAppState;
}

export const sqliteDatabase: Database = {
    createFriend,
    createChat,
    createMessage,
    getAllFriend,
    getSingleChatWithFriendId,
    getSingleFriendWithUsername,
    getAllMessages,
    getSingleFriendWithFriendId,
    getAllChat,
}
