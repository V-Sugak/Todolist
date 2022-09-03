import {Dispatch} from 'redux'
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../../App/app-reducer";
import {authApi, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType