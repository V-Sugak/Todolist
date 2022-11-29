import {TaskType} from "../../api/todolists-api";
import {createSlice} from "@reduxjs/toolkit";
import {addTaskTC, removeTaskTC, setTasksTC, updateTaskTC} from "./tasks-actions";
import {addTodoListTC, removeTodoListTC, setTodoListsTC} from "./todolists-actions";

export const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state [action.payload.todolist.id] = []
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(setTodoListsTC.fulfilled, (state, action) => {
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