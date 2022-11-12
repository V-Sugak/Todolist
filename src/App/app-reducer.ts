import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authApi} from "../api/auth-api";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: null | string) => ({type: "APP/SET-ERROR", error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: "APP/IS-INITIALIZED", isInitialized} as const)

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

//types
type InitialStateType = typeof initialState
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>
