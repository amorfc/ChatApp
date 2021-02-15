import {combineReducers} from "@reduxjs/toolkit"


//Reducer Imports
import authReducer from "./features/auth/auth-reducer";

const rootReducer = combineReducers({
    auth:authReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
