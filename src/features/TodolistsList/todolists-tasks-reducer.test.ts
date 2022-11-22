import {addTodoListTC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistDomainType> = []
    let todolist = {id: "todolistId3", title: "New Todolist", filter: "all", addedDate: "", order: 0}

    const endTasksState = tasksReducer(startTasksState, addTodoListTC.fulfilled({todolist}, "", todolist.title))
    const endTodoListsState = todolistsReducer(startTodoListsState, addTodoListTC.fulfilled({todolist}, "", todolist.title))

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(todolist.id);
    expect(idFromTodoLists).toBe(todolist.id);
});





