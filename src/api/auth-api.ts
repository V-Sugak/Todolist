import {instance, ResponseType} from "./todolists-api";
import {AxiosResponse} from "axios";

//api
export const authApi = {
    authMe() {
        return instance.get<ResponseType<MeType>>("auth/me")
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>("auth/login", data)
    },
    logout() {
        return instance.delete<ResponseType>("auth/login")
    },
}

//types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type MeType = { id: number, email: string, login: string }