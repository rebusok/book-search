import {ResponseBookType, ResponseType} from "../../api/api";


interface stateType {
    docs: Array<ResponseBookType>
    num_found: number
    numFound: number
    start: number
    searchValue:string
}
const initialState:stateType = {
    searchValue: '',
    docs: [] as Array<ResponseBookType>,
    num_found: 0,
    numFound: 0,
    start: 0,
}

export enum ActionType {
    FETCH_BOOKS_SEARCH  = 'FETCH_BOOKS_SEARCH',
    SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
}
export type  SearchActionType =ReturnType<typeof searchBooksFetch> | ReturnType<typeof setSearchValueA>

export const SearchBooksReducer =(state:stateType = initialState, action:SearchActionType):stateType => {
    switch (action.type) {
        case ActionType.FETCH_BOOKS_SEARCH:
            return {...state, ...action.payload}
        case ActionType.SET_SEARCH_VALUE:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const searchBooksFetch = (data:ResponseType) => ({type:ActionType.FETCH_BOOKS_SEARCH, payload:{...data}} as const)
export const setSearchValueA = (searchValue:string) => ({type:ActionType.SET_SEARCH_VALUE, payload:{searchValue}} as const)