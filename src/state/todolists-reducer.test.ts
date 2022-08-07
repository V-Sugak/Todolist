import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterType,
    removeTodolistAC, setTodoListsAC, TodolistDomainType,
    todoListsReducer
} from "./todo-lists-reducer";
import {TodoListType} from "../api/todolists-api";

let startState: Array<TodolistDomainType>;
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0}
    ]
})

test("correct todolist should be removed", () => {
    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle, v1()))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
    let newFilter: FilterType = "completed";

    const endState = todoListsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test("todo-lists should be set to the state ", () => {
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", addedDate: "", order: 0}
    ];
    const endState = todoListsReducer([], setTodoListsAC(startState));

    expect(endState.length).toBe(2);
})




