import {addTodolistAC, TodolistDomainType, todoListsReducer} from "./todo-lists-reducer";
import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodoListType} from "../api/todolists-api";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistDomainType> = []

    const action = addTodolistAC("new todolist", v1());
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodoLists).toBe(action.todolistId);
});





