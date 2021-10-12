import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";



function App() {

    let tasks1: Array<TasksType> = [
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]

    let tasks2:Array<TasksType> = [
        {id: 1, title: 'Terminator', isDone: true},
        {id: 2, title: 'XXX', isDone: false},
        {id: 3, title: 'Gentlemen of fortune', isDone: true},
    ]

    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks1}/>
            <Todolist title='Movies' tasks={tasks2}/>
        </div>
    );
}

export default App;
