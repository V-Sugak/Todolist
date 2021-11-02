import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: filterType) => void
    addTask: (title: string) => void
    filter: filterType
}

export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        let trimmer = title.trim()
        if (trimmer) {
            props.addTask(trimmer);
            setTitle('')
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const changeFilter = (value: filterType) => props.changeFilter(value)

    return (
        <div className='todoList'>
            <h3>{props.title}</h3>
            <div>
                <input placeholder={'Enter your task...'}
                       value={title}
                       onKeyPress={onKeyPressHandler}
                       onChange={onNewTitleChangeHandler}
                       type="text"/>
                <button onClick={addTask}>+</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id)
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <button className={props.filter === 'all' ? 'activeButton' : ''}
                        onClick={() => {
                            changeFilter('all')
                        }}>all
                </button>
                <button className={props.filter === 'active' ? 'activeButton' : ''}
                        onClick={() => {
                            changeFilter('active')
                        }}>active
                </button>
                <button className={props.filter === 'completed' ? 'activeButton' : ''}
                        onClick={() => {
                            changeFilter('completed')
                        }}>completed
                </button>
            </div>
        </div>
    )
}