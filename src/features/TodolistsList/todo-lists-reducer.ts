import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";

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
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({
    type: "TODO-LISTS/SET-TODO-LISTS",
    todoLists
} as const)

//thunks
export const setTodoListsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todoListsApi.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todoListsApi.deleteTodoList(todoListId)
        .then(res => {
            dispatch(removeTodolistAC(todoListId))
            dispatch(setAppStatusAC("succeeded"))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todoListsApi.creatTodoList(title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC("Some error"))
                    }
                    dispatch(setAppStatusAC("failed"))
                }
            }
        )
        .catch((error: AxiosError) => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC("failed"))
        })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todoListsApi.updateTodoList(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todoListId, title))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC("Some error"))
                }
                dispatch(setAppStatusAC("failed"))
            }
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
    | AppActionsType