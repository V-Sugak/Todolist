import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'completed' | 'active';
type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "active"}
    ])


    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
        ],
    })


    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }


    const changeFilter = (filter: FilterType, todolistId: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeIsDone = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => {
                return t.id === taskId ? {...t, isDone: isDone} : t
            })
        })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {todolist.map(tl => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }

                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                }
                return (<Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={tl.filter}
                        changeIsDone={changeIsDone}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
