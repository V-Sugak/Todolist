import {addTodolistAC, removeTodolistAC, setTodoListsAC} from "./todolists-reducer";
import {TaskType, todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {RootState} from "../../App/store";
import {setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todoListId: string }>) {
            const id = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if (id !== -1) {
                state[action.payload.todoListId].splice(id, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string }>) {
            const tl = state[action.payload.todoListId]
            const id = tl.findIndex(t => t.id === action.payload.taskId)
            if (id !== -1) {
                tl[id] = {...tl[id], ...action.payload.domainModel}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todoListId: string }>) {
            state[action.payload.todoListId] = action.payload.tasks
        },
    },
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
    }
})

export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions


//thunks
export const setTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.getTasks(todoListId)
        .then(res => {
            dispatch(setTasksAC({tasks: res.data.items, todoListId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.deleteTask(taskId, todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskId, todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }

        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) =>
    (dispatch: Dispatch, getState: () => RootState) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                description: task.description,
                status: task.status,
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                deadline: task.deadline,
                ...domainModel
            }
            dispatch(setAppStatusAC({status: "loading"}))
            todoListsApi.updateTask(todoListId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({taskId, domainModel, todoListId}))
                        dispatch(setAppStatusAC({status: "succeeded"}))
                    } else {
                        handleServerAppError(dispatch, res.data)
                    }
                })
                .catch((error: AxiosError) => {
                    handleServerNetworkError(dispatch, error.message)
                })
        }
    }

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