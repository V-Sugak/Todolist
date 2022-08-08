import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodoListsAC} from "./todo-lists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi} from "../api/todolists-api";
import {Dispatch} from "redux";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: action.todolistId,
                startDate: "",
                description: "",
                deadline: ""
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case "CHANGE-IS-DONE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const copy = {...state}
            delete copy[action.todolistId]
            return copy
        }
        case "SET-TODO-LISTS": {
            const copy = {...state}
            action.todoLists.forEach(tl => {
                copy[tl.id] = [];
            })
            return copy
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
}
export const changeStatusTaskAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: "CHANGE-IS-DONE", taskId, status, todolistId} as const
}
export const changeTitleTaskAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: "SET-TASKS", tasks, todolistId} as const
}

//thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todoListsApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todoListsApi.deleteTask(taskId, todolistId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

//types
export type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusTaskAC>
    | ReturnType<typeof changeTitleTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
export type TasksStateType = {
    [key: string]: Array<TaskType>
}



