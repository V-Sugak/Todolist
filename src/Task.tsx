import {useDispatch} from "react-redux";
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskTC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const dispatch = useDispatch();
    const removeTask = () => {
        dispatch(removeTaskTC(props.task.id, props.todolistId));
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusTaskAC(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId));
    }
    const onChangeTitleHandler = useCallback((title: string) => {
        dispatch(changeTitleTaskAC(props.task.id, title, props.todolistId))
    }, [dispatch, props.task.id, props.todolistId])

    return (
        <ListItem key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
                  divider
                  style={{
                      padding: '3px 0',
                      display: 'flex',
                      justifyContent: 'space-between'
                  }}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed}
                      onChange={onChangeStatusHandler}
                      color={'primary'}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={removeTask} aria-label="delete" size={'small'}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </ListItem>
    )
})
