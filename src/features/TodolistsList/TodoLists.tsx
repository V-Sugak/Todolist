import React, {useCallback, useEffect} from "react";
import {Todolist} from "./Todolist/Todolist";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterType,
    removeTodoListTC,
    setTodoListsTC
} from "./todolists-reducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../App/hooks/hooks";

export const TodoLists = () => {
    const dispatch = useAppDispatch();
    const todoLists = useAppSelector(state => state.todoLists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(setTodoListsTC())
        }
    }, [])

    const changeFilter = useCallback((filter: FilterType, todoListId: string) => {
        dispatch(changeTodolistFilterAC({filter,todoListId}))
    }, [dispatch])
    const changeTitleTodolist = useCallback((title: string, todoListId: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title))
    }, [dispatch])
    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"login"}/>
    }

    return <>
        <Grid container style={{padding: "20px 0"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
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
