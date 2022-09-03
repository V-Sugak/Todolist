import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    auth: authReducer,
})

export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector
// @ts-ignore
window.store = store