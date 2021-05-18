import Api, {ResponseBookInfo, ResponseBookType} from "../../api/api";
import {AppThunk} from "../store";
import {setDisableBtn, setErrorMes, setStatusAC, StatusFetchEnum} from "../AppReducer/AppReducer";

export interface stateType {
    bookInfo: ResponseBookInfo
    selectBook:ResponseBookType
}
const initialState:stateType = {
    bookInfo: {} as ResponseBookInfo,
    selectBook: {} as ResponseBookType
}
export enum ActionType {
    FETCH_BOOK_INFO  = 'FETCH_BOOK_INFO',
    ADD_SELECT_BOOK = 'ADD_SELECT_BOOK'
}
export type BookInfoActionType = ReturnType<typeof bookInfoFetch> | ReturnType<typeof addSelectBook>
export const BookItemReducer = (state:stateType = initialState, action:BookInfoActionType) => {
    switch (action.type) {
        case ActionType.FETCH_BOOK_INFO:
            return {...state, bookInfo: action.payload}
        case ActionType.ADD_SELECT_BOOK:
            return {...state, selectBook: action.payload}
        default:
            return state
    }
}

export const bookInfoFetch = (data:ResponseBookInfo) => ({type:ActionType.FETCH_BOOK_INFO, payload:{...data}} as const)
export const addSelectBook = (data:ResponseBookType) => ({type:ActionType.ADD_SELECT_BOOK, payload:{...data}} as const)

export const fetchBookInfo = (bookId:string):AppThunk =>  async (dispatch) => {
    dispatch(setStatusAC(StatusFetchEnum.LOADING))
    dispatch(setDisableBtn(true))
    try {
        const res = await Api.fetchOneBook(bookId)
        dispatch(bookInfoFetch(res.data))
        dispatch(setStatusAC(StatusFetchEnum.OK))
    }catch (e) {
        const error =  e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error)
        dispatch(setErrorMes('Что-то пошло не так, попробуйте позже'))
        dispatch(setStatusAC(StatusFetchEnum.FAIL))
        console.log('errors:', {...e})
    } finally {
        dispatch(setDisableBtn(false))
    }
}