import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../App/app-reducer";
import {todoListsApi} from "../../api/todolists-api";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {todolistsActions} from "./index";

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
        dispatch(todolistsActions.setEntityStatusAC({entityStatus: "loading", todoListId}))
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
            dispatch(todolistsActions.setEntityStatusAC({entityStatus: "failed", todoListId}))
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