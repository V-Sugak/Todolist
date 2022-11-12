import {combineReducers} from "redux";
import {TasksActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {TodolistsActionsType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

//types
export type AppRootType = ReturnType<typeof rootReducer>
export type RootActionsType = AppActionsType | TodolistsActionsType | TasksActionsType | AuthActionsType
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, RootActionsType>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store