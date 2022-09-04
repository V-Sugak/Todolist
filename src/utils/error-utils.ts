import { setAppErrorAC, setAppStatusAC} from "../App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";


export const handleServerNetworkError = (dispatch: Dispatch<ActionsErrorType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ActionsErrorType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        if (data.messages.length) {
            dispatch(setAppErrorAC(data.messages[0]))
        } else {
            dispatch(setAppErrorAC("Some error"))
        }
    }
    dispatch(setAppStatusAC("failed"))
}

export type ActionsErrorType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>