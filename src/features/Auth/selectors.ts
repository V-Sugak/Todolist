import {RootState} from "../../App/store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn