import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: addItemFormPropsType) => {
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
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <input placeholder={'Enter title...'}
                   className={error ? 'error' : ''}
                   value={title}
                   onKeyPress={onKeyPressHandler}
                   onChange={onNewTitleChangeHandler}
                   type="text"/>
            <button onClick={addTask}>+</button>
            {error && <div className={'errorDiv'}>Title is required</div>}
        </div>)
}