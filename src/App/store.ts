import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todoListsReducer} from "../features/TodolistsList/todo-lists-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todoLists: todoListsReducer,
})

export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector
// @ts-ignore
window.store = store