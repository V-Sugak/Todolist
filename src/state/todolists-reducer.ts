import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
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