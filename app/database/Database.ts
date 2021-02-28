import SQLite from 'react-native-sqlite-storage'
import {DATABASE} from "./Constants"
import {Friend} from "../types/Friend"
import { Chat } from '../types/Chat'
import { AppState, AppStateStatus } from 'react-native';
import { DatabaseInitialization } from './DatabaseInitialization';
import { Message } from '../types/Message';

export interface Database {
    //create
    createFriend(friend:Friend):Promise<void>;
    // createChat(chat:Chat):Promise<void>;

    //Read
    getAllFriend():Promise<Friend[]>;
}


let databaseInstance: SQLite.SQLiteDatabase | undefined;

async function createFriend(friend:Friend):Promise<void>{
    return getDatabase()
        .then((db)=>db.executeSql("INSERT INTO Friend (username) VALUES(?);",[friend.username]))
        .then(([results])=>{
            console.log(`[db] Friend "${friend.username}" created successfully with id: ${results.insertId}`);
        })
        .catch((reason:any)=>{
            Promise.reject(reason);
        })
}

async function getAllFriend():Promise<Friend[]>{
    return getDatabase()
        .then((db)=>db.executeSql("SELECT * FROM Friend;"))
        .then(([results])=>{
            if(results === undefined){
                return []
            }
            const count = results.rows.length
            const friendLists: Friend[] = []
            for(let i = 0;i<count;i++){
                const row = results.rows.item(i);
                const {friend_id,username,has_active_chat} = row
                const friend:Friend = {
                    friend_id,
                    username,
                    has_active_chat,
                    firstName:"",
                    lastName:"",
                    email:""
                }
                friendLists.push(friend)
            }
            return friendLists
        })
}

async function getDatabase():Promise<SQLite.SQLiteDatabase>{
    if(databaseInstance !== undefined){
        return Promise.resolve(databaseInstance)
    }
    //Open the database first
    return openDb()
}

async function openDb():Promise<SQLite.SQLiteDatabase>{
    SQLite.DEBUG(true)
    SQLite.enablePromise(true)

    if(databaseInstance){
        console.log("[db] Database is already open: returning the existing instance");
        return databaseInstance;
    }

    const db = await SQLite.openDatabase({
        name:DATABASE.FILE_NAME,
        location:'Documents'
    })
    console.log("DB Opened")

// Perform any database initialization or updates, if needed
    const databaseInitialization = new DatabaseInitialization();
    await databaseInitialization.updateDatabaseTables(db);

    databaseInstance = db

    return db

}

async function closeDb():Promise<void>{
    if(databaseInstance === undefined){
        console.log("Database already closed")
        return 
    }

    await databaseInstance.close()
    console.log("[db] Database closed.");
    databaseInstance = undefined
}


let appState = "active"
console.log("[db] Adding listener to handle app state changes");
AppState.addEventListener("change",handleAppStateChange)

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
    if (appState === "active" && nextAppState.match(/inactive|background/)) {
      // App has moved from the foreground into the background (or become inactive)
      console.log("[db] App has gone to the background - closing DB connection.");
      closeDb();
    }
    appState = nextAppState;
  }

  export const sqliteDatabase:Database = {
    createFriend,
    // createChat
    getAllFriend
  }