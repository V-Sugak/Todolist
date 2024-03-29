import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": '4fa630d1-6fae-4037-80dd-d195b9c3e03c'
    }
})

//api
export const todoListsApi = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>("todo-lists")
    },
    creatTodoList(title: string) {
        return instance.post<string, AxiosResponse<ResponseType<{ item: TodoListType }>>>("todo-lists", {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<string, AxiosResponse<ResponseType>>(`todo-lists/${todoListId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(taskId: string, todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<string, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
}

//types
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
export type UpdateTaskModelType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
