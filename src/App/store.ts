import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {TodolistsActionsType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector

//types
export type AppRootType = ReturnType<typeof rootReducer>
export type RootActionsType = AppActionsType | TodolistsActionsType | TasksActionsType | AuthActionsType
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, RootActionsType>

// @ts-ignore
window.store = store