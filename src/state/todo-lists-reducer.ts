import {v1} from "uuid";
import {TodoListType} from "../api/todolists-api";

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
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
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const addTodolistAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId} as const
}
export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todolistId} as const
}
export const changeTodolistFilterAC = (filter: FilterType, todolistId: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, todolistId} as const
}

//types
export type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
export type FilterType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodoListType & {
    filter: FilterType
}