import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../App/store";
import {todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {UpdateDomainTaskModelType} from "./tasks-reducer";

export const updateTaskTC = createAsyncThunk("tasks/updateTask",
    async (param: { taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string }, thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        const task = state.tasks[param.todoListId].find(t => t.id === param.taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                description: task.description,
                status: task.status,
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                deadline: task.deadline,
                ...param.domainModel
            }
            thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
            try {
                const res = await todoListsApi.updateTask(param.todoListId, param.taskId, model)
                if (res.data.resultCode === 0) {
                    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
                    return {taskId: param.taskId, domainModel: param.domainModel, todoListId: param.todoListId}
                } else {
                    handleServerAppError(thunkAPI.dispatch, res.data)
                    return thunkAPI.rejectWithValue(null)
                }
            } catch (err) {
                const error: AxiosError = err as any
                handleServerNetworkError(thunkAPI.dispatch, error.message)
                return thunkAPI.rejectWithValue(null)
            }
        }
        return thunkAPI.rejectWithValue(null)
    })
export const setTasksTC = createAsyncThunk("tasks/setTasks", async (todoListId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListsApi.getTasks(todoListId)
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {tasks: res.data.items, todoListId}
    } catch (err) {
        const error: AxiosError = err as any
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue({})
    }
})
export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (param: { taskId: string, todoListId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListsApi.deleteTask(param.taskId, param.todoListId)

        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {taskId: param.taskId, todoListId: param.todoListId}
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
export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: { todoListId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListsApi.createTask(param.todoListId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {task: res.data.data.item}
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