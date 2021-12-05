import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

    let tasksJSXElement = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todolistId)
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeIsDone(t.id, e.currentTarget.checked, props.todolistId)
        }
        const onChangeTitleHandler = (title: string) => {
            props.changeTitleTask(t.id, title, props.todolistId)
        }
        return (
            <ListItem key={t.id} className={t.isDone ? 'is-done' : ''}
                      divider
                      style={{
                          padding: '3px 0',
                          display: 'flex',
                          justifyContent: 'space-between'
                      }}>
                <Checkbox checked={t.isDone}
                          onChange={onChangeStatusHandler}
                          color={'primary'}/>
                {/* <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>*/}
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={removeTask} aria-label="delete" size={'small'}>
                    <Delete fontSize={'small'}/>
                </IconButton>
            </ListItem>
        )
    })

    return (
        <div className='todoList'>
            <Typography align={'center'} variant={'h5'} style={{fontWeight: 'bold'}}>
                <EditableSpan title={props.title} onChange={onChangeTidolistTitleHandler}/>
                <IconButton onClick={() => props.removeTodolist(props.todolistId)} aria-label="delete">
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <div>
                <List>
                    {tasksJSXElement}
                </List>
            </div>
            <div>
                <ButtonGroup variant={"contained"}>
                    <Button color={props.filter === 'all' ? 'secondary' : 'primary'}
                            onClick={() => {
                                changeFilter('all')
                            }}>All</Button>
                    <Button color={props.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={() => {
                                changeFilter('active')
                            }}>Active</Button>
                    <Button color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={() => {
                                changeFilter('completed')
                            }}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

