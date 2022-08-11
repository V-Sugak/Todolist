import {
    addTaskAC, removeTaskAC, setTasksAC,
    tasksReducer, TasksStateType, updateTaskAC
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodoListsAC} from "./todo-lists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodoListType} from "../api/todolists-api";

let startState: TasksStateType;
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId1",
                startDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId1",
                startDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId1",
                startDate: "",
                description: "",
                deadline: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId2",
                startDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId2",
                startDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId2",
                startDate: "",
                description: "",
                deadline: ""
            },
        ]
    };
})

test("correct task should be deleted from correct array", () => {
    const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"))

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId1",
                startDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId1",
                startDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId1",
                startDate: "",
                description: "",
                deadline: ""
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId2",
                startDate: "",
                description: "",
                deadline: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: "todolistId2",
                startDate: "",
                description: "",
                deadline: ""
            },
        ]
    });

});

test("correct task should be added to correct array", () => {
    const newTask: TaskType = {
        id: "565116565",
        title: "juice",
        status: TaskStatuses.New,
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        todoListId: "todolistId2",
        startDate: "",
        description: "",
        deadline: ""
    }
    const endState = tasksReducer(startState, addTaskAC(newTask))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test("status of specified task should be changed", () => {
    const endState = tasksReducer(startState, updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2"))

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});

test("title of specified task should be changed", () => {
    const endState = tasksReducer(startState, updateTaskAC("2", {title: "juice"}, "todolistId2"))

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("juice");
});

test("new array should be added when new todolist is added", () => {
    let newTodolist = {id: "todolistId3", title: "New Todolist", filter: "all", addedDate: "", order: 0}
    const endState = tasksReducer(startState, addTodolistAC(newTodolist))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test("todo-lists should be set to the state ", () => {
    const todoLists: Array<TodoListType> = [
        {id: "Id1", title: "What to learn", addedDate: "", order: 0},
        {id: "Id2", title: "What to buy", addedDate: "", order: 0}
    ];
    const endState = tasksReducer({}, setTodoListsAC(todoLists));

    expect(endState["Id1"]).toEqual([]);
    expect(endState["Id2"]).toEqual([]);
})

test("tasks should be set to the state", () => {
    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, setTasksAC(startState["todolistId1"], "todolistId1"))

    expect(endState["todolistId2"].length).toBe(0);
    expect(endState["todolistId1"].length).toBe(3);
});

