import React from "react";
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

function App() {
    const status = useAppSelector(state => state.app.status)

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
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App;
