import React, {useEffect} from "react";
import "./App.css";
import {TodoLists} from "../features/TodolistsList/TodoLists";
import {useAppSelector} from "./store";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "./app-reducer";

function App() {
    const status = useAppSelector(state => state.app.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar/>
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
                <Routes>
                    <Route path={"/"} element={<TodoLists/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"404"} element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path={"*"} element={<Navigate to={"404"}/>}/>
                </Routes>
            </Container>

        </div>
    );
}

export default App;
