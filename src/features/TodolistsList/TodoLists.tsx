import React, {useCallback, useEffect} from "react";
import {Todolist} from "./Todolist/Todolist";
import {FilterType} from "./todolists-reducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useActions, useAppSelector} from "../../App/hooks/hooks";
import {authSelectors} from "../Auth";
import {selectTodoLists} from "./selectors";
import {todolistsActions} from "./index";

export const TodoLists = () => {
    const todoLists = useAppSelector(selectTodoLists)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const {
        addTodoListTC,
        changeTodolistTitleTC,
        removeTodoListTC,
        setTodoListsTC,
        changeTodolistFilterAC
    } = useActions(todolistsActions)

    useEffect(() => {
        if (isLoggedIn) {
            setTodoListsTC()
        }
    }, [])

    const changeFilter = useCallback((filter: FilterType, todoListId: string) => {
        changeTodolistFilterAC({filter, todoListId})
    }, [])
    const changeTitleTodolist = useCallback((title: string, todoListId: string) => {
        changeTodolistTitleTC({todoListId, title})
    }, [])
    const removeTodolist = useCallback((todoListId: string) => {
        removeTodoListTC(todoListId)
    }, [])
    const addTodolist = useCallback((title: string) => {
        addTodoListTC(title)
    }, [])

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
