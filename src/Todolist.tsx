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
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState<string>('')

    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        let trimmer = title.trim()
        if (trimmer) {
            props.addTask(trimmer);
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false)
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
                       className={error ? 'error' : ''}
                       value={title}
                       onKeyPress={onKeyPressHandler}
                       onChange={onNewTitleChangeHandler}
                       type="text"/>
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className={'errorDiv'}>Title is required</div>}
            <div>
                <ul>
                    {props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDone(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'isDone' : ""}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
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