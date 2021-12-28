import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducer} from "./state/store";

export type FilterType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}


function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootReducer, Array<TodolistType>>(state => state.todolists)

    const changeFilter = (filter: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId))
    }
    const changeTitleTodolist = (title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title, v1())
        dispatch(action)
    }

    const todolistComponent = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: '50px'}}>
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
            <AppBar position={'sticky'}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button variant="outlined" color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
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
