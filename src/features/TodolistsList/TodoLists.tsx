import React, {useCallback} from "react";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist/Todolist";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterType, removeTodoListTC,
    TodolistDomainType
} from "./todo-lists-reducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../App/store";

export const TodoLists = (props: TodoListsPropsType) => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todoLists)

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