import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authApi} from "../api/auth-api";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//thunks
export const initializeAppTC = createAsyncThunk("app/initializeApp",
    async (param, {dispatch, rejectWithValue}) => {
        try {
            const res = await authApi.authMe()
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
                return
            }
        } catch (err) {
            const error: AxiosError = err as any
            handleServerNetworkError(dispatch, error.message)
            dispatch(setIsInitializedAC({isInitialized: true}))
            return rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as null | string,
        isInitialized: false,
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    },
    extraReducers: (builder => {
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = true
        })
    })
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

