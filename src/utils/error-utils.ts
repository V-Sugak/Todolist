import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";


export const handleServerNetworkError = (dispatch: Dispatch<ActionsErrorType>, error: string) => {
    dispatch(setAppErrorAC({error}))
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ActionsErrorType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        if (data.messages.length) {
            dispatch(setAppErrorAC({error: data.messages[0]}))
        } else {
            dispatch(setAppErrorAC({error: "Some error"}))
        }
    }
    dispatch(setAppStatusAC({status: "failed"}))
}

export type ActionsErrorType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>