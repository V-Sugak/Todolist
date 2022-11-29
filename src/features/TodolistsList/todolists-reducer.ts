import {TodoListType} from "../../api/todolists-api";
import {RequestStatusType} from "../../App/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListTC, changeTodolistTitleTC, removeTodoListTC, setTodoListsTC} from "./todolists-actions";

export const slice = createSlice({
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
} = slice.actions

//types
export type FilterType = "all" | "completed" | "active";
export type TodolistDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}