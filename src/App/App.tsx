import React, {useEffect} from "react";
import "./App.css";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {setTodoListsTC,} from "../features/TodolistsList/todo-lists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TodoLists} from "../features/TodolistsList/TodoLists";
import {AppRootType} from "./store";
import {RequestStatusType} from "./app-reducer";

function App() {
    const dispatch = useDispatch();
    const status = useSelector<AppRootType, RequestStatusType>(state => state.app.status)

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
            {status === "loading" && <LinearProgress color="secondary"/>}
            <Container fixed>
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App;
