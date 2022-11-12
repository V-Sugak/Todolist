import {addTodolistAC, removeTodolistAC, setTodoListsAC} from "./todolists-reducer";
import {TaskType, todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {RootState} from "../../App/store";
import {setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from "redux";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "TASKS/REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "TASKS/ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "TASKS/UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
            }
        case "TODO-LISTS/ADD-TODOLIST":
            return {
                ...state,
                [action.todolist.id]: []
            }
        case "TODO-LISTS/REMOVE-TODOLIST": {
            const copy = {...state}
            delete copy[action.todolistId]
            return copy
        }
        case "TODO-LISTS/SET-TODO-LISTS": {
            const copy = {...state}
            action.todoLists.forEach(tl => {
                copy[tl.id] = [];
            })
            return copy
        }
        case "TASKS/SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "TASKS/REMOVE-TASK",
    taskId,
    todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({type: "TASKS/ADD-TASK", task} as const)
export const updateTaskAC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => ({
    type: "TASKS/UPDATE-TASK",
    taskId,
    domainModel,
    todolistId
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: "TASKS/SET-TASKS",
    tasks,
    todolistId
} as const)

//thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.deleteTask(taskId, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }

        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => RootState) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
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
            todoListsApi.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, domainModel, todolistId))
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
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>




