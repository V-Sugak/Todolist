import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//thunks
export const setTodoListsTC = createAsyncThunk("todolists/setTodoLists",
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: "loading"}))
        try {
            const res = await todoListsApi.getTodoLists()
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todoLists: res.data}
        } catch (err) {
            const error: AxiosError = err as any
            handleServerNetworkError(dispatch, error.message)
            return rejectWithValue(null)
        }
    })
export const removeTodoListTC = createAsyncThunk("todolists/removeTodoList",
    async (todoListId: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(setEntityStatusAC({entityStatus: "loading", todoListId}))
        try {
            const res = await todoListsApi.deleteTodoList(todoListId)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}))
                return {todoListId}
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (err) {
            const error: AxiosError = err as any
            handleServerNetworkError(dispatch, error.message)
            dispatch(setEntityStatusAC({entityStatus: "failed", todoListId}))
            return rejectWithValue(null)
        }
    })
export const addTodoListTC = createAsyncThunk("todolists/addTodoList",
    async (title: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: "loading"}))
        try {
            const res = await todoListsApi.creatTodoList(title)

            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}))
                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (err) {
            const error: AxiosError = err as any
            handleServerNetworkError(dispatch, error.message)
            return rejectWithValue(null)
        }
    })
export const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle",
    async (param: { todoListId: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: "loading"}))
        try {
            const res = await todoListsApi.updateTodoList(param.todoListId, param.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}))
                return {todoListId: param.todoListId, title: param.title}
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (err) {
            const error: AxiosError = err as any
            handleServerNetworkError(dispatch, error.message)
            return rejectWithValue(null)
        }
    })


const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todoListId: string, filter: FilterType }>) {
            const id = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[id].filter = action.payload.filter
        },
        setEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
            const id = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[id].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodoListsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            const id = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (id !== -1) {
                state.splice(id, 1)
            }
        })
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state.unshift({
                ...action.payload.todolist,
                filter: "all",
                entityStatus: "idle"
            })
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const id = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[id].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC,
    setEntityStatusAC
} = slice.actions

//types
export type FilterType = "all" | "completed" | "active";
export type TodolistDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}