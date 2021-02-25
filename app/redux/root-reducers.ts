import {combineReducers} from "@reduxjs/toolkit"


//Reducer Imports
import authReducer from "./features/auth/auth-reducer";
import userReducer from "./features/user/user-reducer";
import chatReducer from "./features/chat/chat-reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    chat:chatReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export default rootReducer
