import React, {useEffect} from "react";
import "./App.css";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {setTodoListsTC,} from "../features/TodolistsList/todo-lists-reducer";
import {useDispatch} from "react-redux";
import {TodoLists} from "../features/TodolistsList/TodoLists";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTodoListsTC())
    }, [])

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
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App;
