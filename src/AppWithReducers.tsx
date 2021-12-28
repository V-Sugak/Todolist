import React, {useReducer} from 'react';
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
    todolistsReducer
} from "./state/todolists-reducer";
import {tasksReducer} from "./state/tasks-reducer";

export type FilterType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolist, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"}
    ])


    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Sugar', isDone: true},
        ],
    })

    /*
        const removeTask = (taskId: string, todolistId: string) => {
            dispatchToTasks(removeTaskAC(taskId, todolistId));
        }
        const addTask = (title: string, todolistId: string) => {
            dispatchToTasks(addTaskAC(title, todolistId));
        }
        const changeIsDone = (taskId: string, isDone: boolean, todolistId: string) => {
            dispatchToTasks(changeIsDoneAC(taskId, isDone, todolistId));
        }
        const changeTitleTask = (id: string, title: string, todolistId: string) => {
            dispatchToTasks(changeTitleTaskAC(id, title, todolistId))
        }*/

    const changeFilter = (filter: FilterType, todolistId: string) => {
        dispatchToTodolist(changeTodolistFilterAC(filter, todolistId))
    }
    const changeTitleTodolist = (title: string, todolistId: string) => {
        dispatchToTodolist(changeTodolistTitleAC(title, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title, v1())
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const todolistComponent = todolist.map(tl => {
        /*  let tasksForTodolist = tasks[tl.id];

          if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }

          if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }*/
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: '50px'}}>
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        // tasks={tasksForTodolist}
                        // removeTask={removeTask}
                        changeFilter={changeFilter}
                        // addTask={addTask}
                        filter={tl.filter}
                        //   changeIsDone={changeIsDone}
                        removeTodolist={removeTodolist}
                        //  changeTitleTask={changeTitleTask}
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

export default AppWithReducers;
