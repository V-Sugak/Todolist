const initialState = {
    status: 'idle' as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}
//actions
const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status})

//types
type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType = any
