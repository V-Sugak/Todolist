import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "TODO-LISTS/REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "TODO-LISTS/ADD-TODOLIST":
            return [{
                ...action.todolist,
                filter: "all",
            },
                ...state]
        case "TODO-LISTS/CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "TODO-LISTS/CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case "TODO-LISTS/SET-TODO-LISTS":
            return action.todoLists.map(tl => ({...tl, filter: "all"}))
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => ({type: "TODO-LISTS/REMOVE-TODOLIST", todolistId} as const)
export const addTodolistAC = (todolist: TodoListType) => ({type: "TODO-LISTS/ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (todoListId: string, title: string) => ({
    type: "TODO-LISTS/CHANGE-TODOLIST-TITLE",
    title,
    todoListId
} as const)
export const changeTodolistFilterAC = (filter: FilterType, todolistId: string) => ({
    type: "TODO-LISTS/CHANGE-TODOLIST-FILTER",
    filter,
    todolistId
} as const)
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: "TODO-LISTS/SET-TODO-LISTS", todoLists} as const)

//thunks
export const setTodoListsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todoListsApi.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    todoListsApi.deleteTodoList(todoListId)
        .then(res => {
            dispatch(removeTodolistAC(todoListId))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todoListsApi.creatTodoList(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todoListsApi.updateTodoList(todoListId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todoListId, title))
        })
}

//types
export type FilterType = "all" | "completed" | "active";
export type TodolistDomainType = TodoListType & {
    filter: FilterType
}
export type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoListsAC>