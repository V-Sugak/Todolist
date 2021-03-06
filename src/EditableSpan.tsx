import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activeViewMode()
        }
    }

    return (
        editMode ?
            <TextField value={title}
                       onChange={onChangeHandler}
                       autoFocus={true}
                       onBlur={activeViewMode}
                       style={{width: '150px'}}
                       onKeyPress={onKeyPressInput}
            />
            : <span onDoubleClick={activeEditMode}>
                {props.title}
                <IconButton onClick={activeEditMode} size={"small"}>
                   <Edit style={{fontSize: 18}}/>
                </IconButton>
            </span>
    )
})
