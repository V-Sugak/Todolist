import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'completed' | 'active';

function App() {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])


    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const [filter, setFilter] = useState<filterType>('all')

    const changeFilter = (filter: filterType) => {
        setFilter(filter);
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks([...tasks, newTask])
    }

    const changeIsDone = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => {
            if (t.id === taskId) {
                return {...t, isDone: isDone}
            } else {
                return t
            }
        }))
    }

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
                changeIsDone={changeIsDone}
            />
        </div>
    );
}

export default App;
