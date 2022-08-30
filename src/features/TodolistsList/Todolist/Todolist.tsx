import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {addTaskTC, setTasksTC} from "../tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../App/store";
import {Task} from "./Task/Task";
import {FilterType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import {ButtonGroup, List} from "@mui/material";
import Button from "@mui/material/Button";
import {RequestStatusType} from "../../../App/app-reducer";

type TodolistPropsType = {
    todolistId: string
    title: string
    changeFilter: (filter: FilterType, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (title: string, todolistId: string) => void
    entityStatus: RequestStatusType
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch();
    let tasks = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[props.todolistId])
    const toCheckStatus = props.entityStatus === "loading"

    useEffect(() => {
        dispatch(setTasksTC(props.todolistId))
    }, [props.todolistId])

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }

    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    const changeFilter = useCallback((value: FilterType) => props.changeFilter(value, props.todolistId), [props.changeFilter, props.todolistId]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolistId, title));
    }, [dispatch, props.todolistId]);

    const onChangeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTitleTodolist(title, props.todolistId)
    }, [props.changeTitleTodolist, props.todolistId]);


    let tasksJSXElement = tasks.map(t => {
        return <Task key={t.id} task={t} todolistId={props.todolistId}/>
    })

    return (
        <div className='todoList'>
            <Typography align={'center'} variant={'h5'} style={{fontWeight: 'bold'}}>
                <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler} disabled={toCheckStatus}/>
                <IconButton disabled={toCheckStatus}
                            onClick={() => props.removeTodolist(props.todolistId)} aria-label="delete">
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask} disabled={toCheckStatus}/>
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
})


