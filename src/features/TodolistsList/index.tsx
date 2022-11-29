import * as todolistsSelectors from "./selectors"
import * as tasksActions from "./tasks-actions"
import * as todolistsAsyncActions from "./todolists-actions"
import {slice} from "./todolists-reducer"

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {
    todolistsSelectors,
    tasksActions,
    todolistsActions
}