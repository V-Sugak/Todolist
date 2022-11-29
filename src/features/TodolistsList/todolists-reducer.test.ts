import {v1} from "uuid";
import {
    changeTodolistFilterAC,
    FilterType, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {TodoListType} from "../../api/todolists-api";
import {addTodoListTC, changeTodolistTitleTC, removeTodoListTC, setTodoListsTC} from "./todolists-actions";

let startState: Array<TodolistDomainType>;
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"}
    ]
})

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodoListTC.fulfilled({todoListId: todolistId1}, "", todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let todolist = {id: "todolistId3", title: "New Todolist", filter: "all", addedDate: "", order: 0}
    const endState = todolistsReducer(startState, addTodoListTC.fulfilled({todolist}, "", todolist.title))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");
});

test("correct todolist should change its name", () => {
    let title = "New Todolist";

    const param = {title, todoListId: todolistId2};
    const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled(param, "", param));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(title);
});

test("correct filter of todolist should be changed", () => {
    let filter: FilterType = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC({filter, todoListId: todolistId2}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(filter);
});

test("todo-lists should be set to the state ", () => {
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", addedDate: "", order: 0}
    ];
    const endState = todolistsReducer([], setTodoListsTC.fulfilled({todoLists: startState}, ""));

    expect(endState.length).toBe(2);
})




