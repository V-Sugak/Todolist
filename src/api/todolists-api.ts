import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "4fa630d1-6fae-4037-80dd-d195b9c3e03c"},
})

const todoListsApi = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>("todo-lists")
    },
    creatTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
}

//types
type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type TaskType = {
    description: string
    title: string
    status: number
    priority: number
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
type UpdateTaskModelType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
