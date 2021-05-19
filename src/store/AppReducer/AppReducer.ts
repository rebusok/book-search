import {RequestStatusType} from "../../data/Types/RootTypes";


export interface stateType {
    status: RequestStatusType,
    errorMes: string | null
    disableBtn: boolean
}


const initialState: stateType = {
    status: "succeeded",
    errorMes: null,
    disableBtn: false
}




export enum ActionType {
    SET_STATUS = 'APP/SET_STATUS',
    SET_ERROR_MES = 'APP/SET_ERROR_MES',
    SET_DISABLE_BTN = 'APP/SET_DISABLE_BTN',
}


export type AppType = ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorMes>
    | ReturnType<typeof setDisableBtn>


export const AppReducer = (state: stateType = initialState, action: AppType): stateType => {
    switch (action.type) {
        case ActionType.SET_STATUS: {
            return {...state, ...action.payload}
        }
        case ActionType.SET_ERROR_MES:
            return {...state, ...action.payload}
        case ActionType.SET_DISABLE_BTN:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: ActionType.SET_STATUS, payload: {status}})
export const setDisableBtn = (disableBtn: boolean) => ({type: ActionType.SET_DISABLE_BTN, payload: {disableBtn}})

export const setErrorMes = (errorMes: string) => ({type: ActionType.SET_ERROR_MES, payload: {errorMes}})