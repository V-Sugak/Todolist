import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

const initialState: Array<TodolistType> = [
    {id: v1(), title: 'What to learn', filter: "all"},
    {id: v1(), title: 'What to buy', filter: "all"}
]


export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{id: action.id, title: action.title, filter: "all"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}

export const addTodolistAC = (title: string, id: string) => {
    return {type: 'ADD-TODOLIST', title, id} as const
}

export const changeTodolistTitleAC = (title: string, id: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id} as const
}

export const changeTodolistFilterAC = (filter: FilterType, id: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id} as const
}