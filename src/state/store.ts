import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todo-lists-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
})

export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store