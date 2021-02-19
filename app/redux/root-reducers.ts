import {combineReducers} from "@reduxjs/toolkit"


//Reducer Imports
import authReducer from "./features/auth/auth-reducer";
import userReducer from "./features/user/user-reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export default rootReducer
