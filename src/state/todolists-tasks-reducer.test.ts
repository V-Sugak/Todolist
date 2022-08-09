import {addTodolistAC, TodolistDomainType, todoListsReducer} from "./todo-lists-reducer";
import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodoListType} from "../api/todolists-api";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistDomainType> = []
    let newTodolist = {id: "todolistId3", title: "New Todolist", filter: "all", addedDate: "", order: 0}

    const endTasksState = tasksReducer(startTasksState, addTodolistAC(newTodolist))
    const endTodoListsState = todoListsReducer(startTodoListsState, addTodolistAC(newTodolist))

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(newTodolist.id);
    expect(idFromTodoLists).toBe(newTodolist.id);
});





