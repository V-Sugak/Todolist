import React, {useState, ChangeEvent} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
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

    return (
        editMode ?
            <input value={title} onChange={onChangeHandler} autoFocus onBlur={activeViewMode}/> :
            <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
}
