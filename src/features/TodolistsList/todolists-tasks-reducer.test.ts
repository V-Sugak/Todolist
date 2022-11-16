import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodoListType} from "../../api/todolists-api";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistDomainType> = []
    let todolist = {id: "todolistId3", title: "New Todolist", filter: "all", addedDate: "", order: 0}

    const endTasksState = tasksReducer(startTasksState, addTodolistAC({todolist}))
    const endTodoListsState = todolistsReducer(startTodoListsState, addTodolistAC({todolist}))

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(todolist.id);
    expect(idFromTodoLists).toBe(todolist.id);
});





