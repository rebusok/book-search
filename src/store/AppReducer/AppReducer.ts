export interface stateType {
    isInitial: boolean
}


const initialState: stateType = {
    isInitial: false,
}


//Type
export enum ActionType {
    SET_INITIAL_APP = 'APP/INITIAL_APP',
}

//actions
export type AppType = ReturnType<typeof setInitialApp>


export const AppReducer = (state: stateType = initialState, action: AppType): stateType => {
    switch (action.type) {
        case ActionType.SET_INITIAL_APP:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setInitialApp = (isInitial:boolean) => ({type:ActionType.SET_INITIAL_APP, payload:{isInitial}})