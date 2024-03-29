import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import {ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "../../../../App/hooks/hooks";
import {removeTaskTC, updateTaskTC} from "../../tasks-actions";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch();
    const removeTask = () => {
        dispatch(removeTaskTC({taskId: props.task.id, todoListId: props.todolistId}));
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC({taskId: props.task.id, domainModel: {status}, todoListId: props.todolistId}));
    }
    const onChangeTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTC({taskId: props.task.id, domainModel: {title}, todoListId: props.todolistId}))
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
