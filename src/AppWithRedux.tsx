import React, {useCallback, useEffect} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, FilterType,
    removeTodolistAC, removeTodoListTC, setTodoListsAC, setTodoListsTC, TodolistDomainType,
} from "./state/todo-lists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";

function AppWithRedux() {
    console.log('App')
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todoLists)

    useEffect(() => {
        dispatch(setTodoListsTC())
    }, [])

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

    const todolistComponent = todolists.map(tl => {
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
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position={"sticky"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolist
                    </Typography>
                    <Button variant="outlined" color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistComponent}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
