import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setTasksTC} from "./tasks-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todoListId: string }>) {
            const id = state.findIndex(tl => tl.id === action.payload.todoListId)
            if(id !==-1){
                state.splice(id,1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodoListType }>) {
            state.unshift({
                ...action.payload.todolist,
                filter: "all",
                entityStatus: "idle"
            })
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todoListId: string, title: string }>) {
            const id = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[id].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ todoListId: string, filter: FilterType }>) {
            const id = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[id].filter = action.payload.filter
        },
        setEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
            const id = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[id].entityStatus = action.payload.entityStatus
        },
        setTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
    }
})

export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodoListsAC,
    setEntityStatusAC
} = slice.actions

//thunks
export const setTodoListsTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC({todoLists: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
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
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(setEntityStatusAC({entityStatus: "loading", todoListId}))
    todoListsApi.deleteTodoList(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC({todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
            dispatch(setEntityStatusAC({entityStatus: "failed", todoListId}))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.creatTodoList(title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            }
        )
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.updateTodoList(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({todoListId, title}))
                dispatch(setAppStatusAC({status: "succeeded"}))
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