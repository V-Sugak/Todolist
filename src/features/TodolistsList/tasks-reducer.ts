import {addTodolistAC, removeTodolistAC, setTodoListsAC} from "./todolists-reducer";
import {TaskType, todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {RootState} from "../../App/store";
import {setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from "redux";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//thunks
export const setTasksTC = createAsyncThunk("tasks/setTasks", (todoListId: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    return todoListsApi.getTasks(todoListId)
        .then(res => {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {tasks: res.data.items, todoListId}
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
            return rejectWithValue({})
        })
})
export const removeTaskTC = createAsyncThunk("tasks/removeTask", (param: { taskId: string, todoListId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    return todoListsApi.deleteTask(param.taskId, param.todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}))
                return {taskId: param.taskId, todoListId: param.todoListId}
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
            return rejectWithValue(null)
        })
})
export const addTaskTC = createAsyncThunk("tasks/addTask", (param: { todoListId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    return todoListsApi.createTask(param.todoListId, param.title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}))
                return {task: res.data.data.item}
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
            return rejectWithValue(null)
        })
})
export const updateTaskTC = createAsyncThunk("tasks/updateTask",
    (param: { taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string }, thunkAPI) => {
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
            return todoListsApi.updateTask(param.todoListId, param.taskId, model)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
                        return {taskId: param.taskId, domainModel: param.domainModel, todoListId: param.todoListId}
                    } else {
                        handleServerAppError(thunkAPI.dispatch, res.data)
                        return thunkAPI.rejectWithValue(null)
                    }

                })
                .catch((error: AxiosError) => {
                    handleServerNetworkError(thunkAPI.dispatch, error.message)
                    return thunkAPI.rejectWithValue(null)
                })
        }
    })

export const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state [action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(setTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const id = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if (id !== -1) {
                state[action.payload.todoListId].splice(id, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            }
        )
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tl = state[action.payload.todoListId]
            const id = tl.findIndex(t => t.id === action.payload.taskId)
            if (id !== -1) {
                tl[id] = {...tl[id], ...action.payload.domainModel}
            }
        })
    }
})

export const tasksReducer = slice.reducer

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}