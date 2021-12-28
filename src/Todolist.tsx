import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC, changeIsDoneAC, changeTitleTaskAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducer} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    changeFilter: (filter: FilterType, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (title: string, todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch();
    let tasks = useSelector<AppRootReducer, Array<TaskType>>(state => state.tasks[props.todolistId])


    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }

    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }


    const changeFilter = (value: FilterType) => props.changeFilter(value, props.todolistId)
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todolistId));
    }
    const onChangeTidolistTitleHandler = (title: string) => {
        props.changeTitleTodolist(title, props.todolistId)
    }

    let tasksJSXElement = tasks.map(t => {
        const removeTask = () => {
            dispatch(removeTaskAC(t.id, props.todolistId));
        }
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeIsDoneAC(t.id, e.currentTarget.checked, props.todolistId));
        }
        const onChangeTitleHandler = (title: string) => {
            dispatch(changeTitleTaskAC(t.id, title, props.todolistId))
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

