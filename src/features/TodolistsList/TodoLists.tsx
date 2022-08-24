import React, {useCallback, useEffect} from "react";
import {Todolist} from "./Todolist/Todolist";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterType, removeTodoListTC, setTodoListsTC,
    TodolistDomainType
} from "./todolists-reducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../App/store";
import {Grid, Paper} from "@mui/material";

export const TodoLists = (props: TodoListsPropsType) => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todoLists)
    useEffect(() => {
        dispatch(setTodoListsTC())
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, [dispatch])
    const changeTitleTodolist = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])
    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return <>
        <Grid container style={{padding: "20px 0"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={4}>
            {todoLists.map(tl => {
                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={8} style={{padding: "50px"}}>
                            <Todolist
                                key={tl.id}
                                todolistId={tl.id}
                                title={tl.title}
                                changeFilter={changeFilter}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTitleTodolist={changeTitleTodolist}
                                entityStatus={tl.entityStatus}
                            />
                        </Paper>
                    </Grid>
                )
            })
            }
        </Grid>
    </>

}

type TodoListsPropsType = {}