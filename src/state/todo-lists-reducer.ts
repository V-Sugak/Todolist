import {v1} from "uuid";
import {todoListsApi, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0
            },
                ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODO-LISTS": {
            return action.todoLists.map(tl => ({...tl, filter: "all"}))
        }
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", todolistId} as const
}
export const addTodolistAC = (title: string, todolistId: string) => {
    return {type: "ADD-TODOLIST", title, todolistId} as const
}
export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", title, todolistId} as const
}
export const changeTodolistFilterAC = (filter: FilterType, todolistId: string) => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, todolistId} as const
}
export const setTodoListsAC = (todoLists: Array<TodoListType>) => {
    return {type: "SET-TODO-LISTS", todoLists} as const
}

//thunks
export const setTodoListsTC = () => (dispatch: Dispatch) => {
    todoListsApi.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}

//types
export type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoListsAC>
export type FilterType = "all" | "completed" | "active";
export type TodolistDomainType = TodoListType & {
    filter: FilterType
}