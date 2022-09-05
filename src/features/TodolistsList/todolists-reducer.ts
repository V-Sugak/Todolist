import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setTasksTC} from "./tasks-reducer";
import {ThunkType} from "../../App/store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "TODO-LISTS/REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "TODO-LISTS/ADD-TODOLIST":
            return [{
                ...action.todolist,
                filter: "all",
                entityStatus: "idle"
            },
                ...state]
        case "TODO-LISTS/CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "TODO-LISTS/CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case "TODO-LISTS/SET-TODO-LISTS":
            return action.todoLists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        case "TODO-LISTS/SET-STATUS":
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)
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
export const setEntityStatusAC = (entityStatus: RequestStatusType, todolistId: string) => ({
    type: "TODO-LISTS/SET-STATUS",
    entityStatus, todolistId
} as const)

//thunks
export const setTodoListsTC = (): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todoListsApi.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
            return res.data
        })
        .then(todos => {
            todos.forEach(tl => {
                return dispatch(setTasksTC(tl.id))
            })
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const removeTodoListTC = (todoListId: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setEntityStatusAC("loading", todoListId))
    todoListsApi.deleteTodoList(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todoListId))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
            dispatch(setEntityStatusAC("failed", todoListId))
        })
}
export const addTodoListTC = (title: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todoListsApi.creatTodoList(title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            }
        )
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const changeTodolistTitleTC = (todoListId: string, title: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todoListsApi.updateTodoList(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todoListId, title))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}

//types
export type FilterType = "all" | "completed" | "active";
export type TodolistDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type TodolistsActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setEntityStatusAC>
