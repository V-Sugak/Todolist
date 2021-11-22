import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterType
    changeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTitleTask: (id: string, title: string, todolistId: string) => void
    changeTitleTodolist: (title: string, todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const changeFilter = (value: FilterType) => props.changeFilter(value, props.todolistId)
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const onChangeTidolistTitleHandler = (title: string) => {
        props.changeTitleTodolist(title, props.todolistId)
    }

    return (
        <div className='todoList'>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTidolistTitleHandler}/>
                <button onClick={() => props.removeTodolist(props.todolistId)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <ul>
                    {props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id, props.todolistId)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDone(t.id, e.currentTarget.checked, props.todolistId)
                        }
                        const onChangeTitleHandler = (title: string) => {
                            props.changeTitleTask(t.id, title, props.todolistId)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'isDone' : ""}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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

