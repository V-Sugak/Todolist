import {useDispatch} from "react-redux";
import {changeIsDoneAC, changeTitleTaskAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const dispatch = useDispatch();
    const removeTask = () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId));
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeIsDoneAC(props.task.id, e.currentTarget.checked, props.todolistId));
    }
    const onChangeTitleHandler = useCallback((title: string) => {
        dispatch(changeTitleTaskAC(props.task.id, title, props.todolistId))
    }, [dispatch, props.task.id, props.todolistId])

    return (
        <ListItem key={props.task.id} className={props.task.isDone ? 'is-done' : ''}
                  divider
                  style={{
                      padding: '3px 0',
                      display: 'flex',
                      justifyContent: 'space-between'
                  }}>
            <Checkbox checked={props.task.isDone}
                      onChange={onChangeStatusHandler}
                      color={'primary'}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={removeTask} aria-label="delete" size={'small'}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </ListItem>
    )
})
