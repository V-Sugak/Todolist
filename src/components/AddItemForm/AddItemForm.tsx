import React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {AddBox} from '@mui/icons-material';

type addItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo((props: addItemFormPropsType) => {
    console.log('AddItemForm')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        let trimmer = title.trim()
        if (trimmer) {
            props.addItem(trimmer);
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        if (error) {
            setError(false)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const errorMessage = error && <div style={{color: "red", textAlign: 'center'}}>Title is required</div>

    return (
        <div>
            <TextField variant="outlined"
                       label="Enter title..."
                       size={'small'}
                       className={error ? 'error' : ''}
                       value={title}
                       onKeyPress={onKeyPressHandler}
                       onChange={onNewTitleChangeHandler}
                       error={error}
                       helperText={errorMessage}
                       disabled={props.disabled}/>
            <IconButton disabled={props.disabled} onClick={addTask} size={'small'}>
                <AddBox color={'primary'} fontSize={'large'}/>
            </IconButton>
        </div>)
})